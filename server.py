# VOLADO backend: estáticos + /api/volado, /api/shared, /api/share, /api/quota.
# Modo directo: cada volado manda SU job de 1000 shots a IBM en ese momento.
# GET /api/volado inicia el job y regresa {pending: id}; el front hace poll con
# /api/volado?job=<id> hasta que la cola de IBM lo suelte. (La versión con pool
# de bits vive en la branch `pool`.)
# .env: IBM_API (API key de IBM Cloud), IBM_CRN (opcional).

import json, os, threading, time, uuid
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))
POOL_FILE = os.environ.get('POOL_FILE', os.path.join(ROOT, 'pool.json'))
SHARED_FILE = os.path.join(os.path.dirname(POOL_FILE), 'shared.json')
SHOTS = 1000            # por volado, debe coincidir con config.js
MAX_JOBS_DAY = 8        # tope de jobs/día: ~3 s de QPU por job, protege los 600 s/mes
QUOTA_TTL = 300         # cache de /api/quota, evita pegarle a IBM en cada request
PORT = int(os.environ.get('PORT', 8000))

# No servir estos por HTTP aunque estén junto a server.py (fuga de secretos / predecir bits).
BLOCKED = {'server.py', 'pool.json', 'shared.json', 'ads-on.sh', 'dockerfile', 'docker-compose.yml'}

for line in open(os.path.join(ROOT, '.env')) if os.path.exists(os.path.join(ROOT, '.env')) else []:
    line = line.strip()
    if line and not line.startswith('#') and '=' in line:
        k, v = line.split('=', 1)
        os.environ.setdefault(k, v)

lock = threading.Lock()
_svc_lock = threading.Lock()
_service = None


def load(path, default):
    # self-healing: un archivo corrupto se trata como vacío, no tira el endpoint
    try:
        return json.load(open(path))
    except Exception:
        return default


def save(path, obj):
    # atómico: escribe en .tmp y renombra, así un kill a medias no corrompe el archivo
    tmp = path + '.tmp'
    with open(tmp, 'w') as f:
        json.dump(obj, f)
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp, path)


def get_service():
    # cacheado y serializado: sin esto, quota y refill construyen el servicio a la
    # vez (dos auths concurrentes) y uno truena. Se reusa: un solo auth por proceso.
    global _service
    with _svc_lock:
        if _service is None:
            from qiskit_ibm_runtime import QiskitRuntimeService
            _service = QiskitRuntimeService(
                channel='ibm_quantum_platform',
                token=os.environ['IBM_API'],
                instance=os.environ.get('IBM_CRN') or None,
            )
    return _service


_quota = {'t': 0, 'v': None}


def quota():
    if _quota['v'] and time.time() - _quota['t'] < QUOTA_TTL:
        return _quota['v']
    u = get_service().usage()
    v = {k: u.get(k) for k in
         ('usage_consumed_seconds', 'usage_limit_seconds',
          'usage_remaining_seconds', 'usage_period')}
    _quota.update(t=time.time(), v=v)
    return v


JOBS = {}   # id → estado del volado en curso; en memoria: un restart pierde los pendientes


def jobs_today():
    with lock:
        j = load(POOL_FILE, {}).get('jobs', {})
        return j.get('n', 0) if j.get('day') == time.strftime('%Y-%m-%d') else 0


def count_job():
    # cuenta SOLO jobs mandados con éxito (QPU gastado de verdad)
    with lock:
        d = load(POOL_FILE, {})
        day = time.strftime('%Y-%m-%d')
        j = d.get('jobs', {})
        j = {'day': day, 'n': 0} if j.get('day') != day else j
        j['n'] = j.get('n', 0) + 1
        d['jobs'] = j
        save(POOL_FILE, d)


def _submit(vid):
    # en hilo aparte: least_busy + transpile + submit tardan ~10-20 s y el
    # request de inicio debe regresar de inmediato
    v = JOBS[vid]
    try:
        from qiskit import QuantumCircuit
        from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager
        from qiskit_ibm_runtime import SamplerV2

        service = get_service()
        backend = service.least_busy(operational=True, simulator=False)
        pending = backend.status().pending_jobs

        qc = QuantumCircuit(1, 1)
        qc.h(0)
        qc.measure(0, 0)
        isa = generate_preset_pass_manager(optimization_level=1, backend=backend).run(qc)

        cfg = backend.configuration()
        proc = getattr(cfg, 'processor_type', {}) or {}
        job = SamplerV2(mode=backend).run([isa], shots=SHOTS)
        print(f'→ job {job.job_id()} de {SHOTS} shots a {backend.name} (cola: {pending})', flush=True)
        v.update(job=job, backend=backend.name, queue=pending,
                 chip=f"{proc.get('family', '?')} r{proc.get('revision', '?')} · {cfg.num_qubits}q",
                 status='queued')
        count_job()
    except Exception as e:
        print('!! submit:', e, flush=True)
        v['status'] = 'error'


def start_volado():
    if jobs_today() >= MAX_JOBS_DAY:
        return None
    now = time.time()
    for k in [k for k, v in JOBS.items() if now - v['t'] > 7200]:
        del JOBS[k]   # poda: nadie hace poll de un volado de hace 2 horas
    vid = uuid.uuid4().hex[:12]
    JOBS[vid] = {'status': 'submitting', 't': now}
    threading.Thread(target=_submit, args=(vid,), daemon=True).start()
    return vid


def check_volado(vid):
    v = JOBS.get(vid)
    if not v:
        return {'error': 'gone'}, 404
    if v['status'] == 'error':
        return {'error': 'ibm'}, 502
    if v['status'] == 'submitting':
        return {'pending': vid, 'status': 'submitting'}, 202
    if 'result' in v:
        return v['result'], 200
    st = str(v['job'].status()).upper()
    if st == 'DONE':
        v['result'] = _finish(v)
        return v['result'], 200
    if st in ('ERROR', 'CANCELLED'):
        return {'error': 'ibm'}, 502
    return {'pending': vid, 'status': st.lower(), 'queue': v['queue']}, 202


def _finish(v):
    job = v['job']
    bits = ''.join(job.result()[0].data.c.get_bitstrings())
    zero = bits.count('0')
    if zero * 2 == len(bits):
        bit = int(bits[-1])   # empate exacto (~2.5%): el último tiro decide
    else:
        bit = 0 if zero > len(bits) - zero else 1
    try:
        exec_ms = int(job.usage() * 1000)
    except Exception:
        exec_ms = 0
    return {
        'bit': bit,
        'counts': {'zero': zero, 'one': len(bits) - zero},
        'job': {
            'id': job.job_id(),
            'backend': v['backend'],
            'chip': v['chip'],
            'execMs': exec_ms,
            'queue': v['queue'],   # cola al entrar; IBM no da posición en vivo
            'url': f'https://quantum.ibm.com/jobs/{job.job_id()}',
        },
    }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        super().end_headers()

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/api/quota':
            try:
                return self.send_json(quota())
            except Exception as e:
                print('!!', e)
                return self.send_json({'error': 'ibm'}, 502)
        if path == '/api/shared':
            with lock:
                shared = load(SHARED_FILE, [])
            return self.send_json(shared[:20])
        if path == '/api/volado':
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            vid = dict(p.split('=', 1) for p in qs.split('&') if '=' in p).get('job')
            try:
                if vid:
                    body, code = check_volado(vid)
                    return self.send_json(body, code)
                vid = start_volado()
            except Exception as e:
                print('!!', e)
                return self.send_json({'error': 'ibm'}, 502)
            if not vid:
                return self.send_json({'error': 'cooldown'}, 503)
            return self.send_json({'pending': vid, 'status': 'submitting'}, 202)
        if '/.' in path or path.lstrip('/').lower() in BLOCKED:
            return self.send_error(404)
        return super().do_GET()

    def do_POST(self):
        if self.path != '/api/share':
            return self.send_json({'error': 'nope'}, 404)
        try:
            n = max(0, min(int(self.headers.get('Content-Length', 0)), 2048))
            data = json.loads(self.rfile.read(n))
            q = str(data['q']).strip()[:140]
            bit = int(data['bit'])
            assert q and bit in (0, 1)
        except Exception:
            return self.send_json({'error': 'bad'}, 400)
        with lock:
            shared = load(SHARED_FILE, [])
            shared.insert(0, {'q': q, 'bit': bit})
            save(SHARED_FILE, shared[:50])
        self.send_json({'ok': True})


if __name__ == '__main__':
    print(f'http://localhost:{PORT}')
    ThreadingHTTPServer(('', PORT), Handler).serve_forever()
