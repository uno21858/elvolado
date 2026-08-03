# VOLADO backend: estáticos + /api/volado, /api/shared, /api/share, /api/quota.
# Un job grande a IBM llena el pool de bits; cada volado consume 1000.
# El pool se rellena en un hilo de fondo: una petición nunca espera a la cola de IBM.
# .env: IBM_API (API key de IBM Cloud), IBM_CRN (opcional).

import json, os, threading, time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))
POOL_FILE = os.environ.get('POOL_FILE', os.path.join(ROOT, 'pool.json'))
SHARED_FILE = os.path.join(os.path.dirname(POOL_FILE), 'shared.json')
SHOTS = 1000            # por volado, debe coincidir con config.js
POOL_SHOTS = 100_000    # por job: mismo costo de QPU que uno chico, 100x bits
REFILL_AT = SHOTS * 5   # rellena cuando quedan menos de 5 volados
MAX_REFILLS_DAY = 3     # tope de jobs pagados/día: un bot no puede quemar el mes en minutos
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
refilling = threading.Event()   # un solo refill a la vez
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


def refill_pool():
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

    print(f'→ job de {POOL_SHOTS} shots a {backend.name} (cola: {pending})...')
    job = SamplerV2(mode=backend).run([isa], shots=POOL_SHOTS)
    bits = ''.join(job.result()[0].data.c.get_bitstrings())

    try:
        exec_ms = int(job.usage() * 1000)
    except Exception:
        exec_ms = 0
    cfg = backend.configuration()
    proc = getattr(cfg, 'processor_type', {}) or {}
    chip = f"{proc.get('family', '?')} r{proc.get('revision', '?')} · {cfg.num_qubits}q"

    return {
        'bits': bits,
        'job': {
            'id': job.job_id(),
            'backend': backend.name,
            'chip': chip,
            'execMs': exec_ms,
            'queue': pending,   # cola al entrar; IBM no da posición en vivo
            'url': f'https://quantum.ibm.com/jobs/{job.job_id()}',
        },
    }


def _do_refill():
    try:
        fresh = refill_pool()
        with lock:
            pool = load(POOL_FILE, {})
            day = time.strftime('%Y-%m-%d')
            r = pool.get('refills', {})
            r = {'day': day, 'n': 0} if r.get('day') != day else r
            r['n'] = r.get('n', 0) + 1   # cuenta SOLO refills exitosos (QPU gastado de verdad)
            fresh['refills'] = r
            save(POOL_FILE, fresh)
        print(f"← {len(fresh['bits'])} bits en el pool.", flush=True)
    except Exception as e:
        print('!! refill:', e, flush=True)   # un refill fallido NO quema el tope; el próximo request reintenta
    finally:
        refilling.clear()


def maybe_refill(pool):
    # dispara un refill de fondo si el pool va bajo y no se pasó el tope de jobs pagados/día
    if refilling.is_set():
        return
    r = pool.get('refills', {})
    n = r.get('n', 0) if r.get('day') == time.strftime('%Y-%m-%d') else 0
    if n >= MAX_REFILLS_DAY:
        return
    refilling.set()
    threading.Thread(target=_do_refill, daemon=True).start()


def volado():
    with lock:
        pool = load(POOL_FILE, {'bits': ''})
        bits = pool.get('bits', '')
        if len(bits) < REFILL_AT:
            maybe_refill(pool)
            bits = pool.get('bits', '')
        if len(bits) <= SHOTS:   # sin bits suficientes: el refill viene en camino
            return None
        batch, rest = bits[:SHOTS], bits[SHOTS:]
        zero = batch.count('0')
        if zero * 2 == SHOTS:
            bit, rest = int(rest[0]), rest[1:]   # empate exacto (~2.5%): un bit extra decide
        else:
            bit = 0 if zero > SHOTS - zero else 1
        pool['bits'] = rest
        save(POOL_FILE, pool)
    return {
        'bit': bit,
        'counts': {'zero': zero, 'one': SHOTS - zero},
        'job': pool['job'],
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
            try:
                data = volado()
            except Exception as e:
                print('!!', e)
                return self.send_json({'error': 'ibm'}, 502)
            return self.send_json(data) if data else self.send_json({'error': 'cooldown'}, 503)
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
