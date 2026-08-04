/* VOLADO front-end. El estado vive aquí. La pregunta nunca sale del navegador. */

const { API, DAILY_LIMIT, SHOTS } = window.VOLADO;

/* Modo directo: el primer GET manda el job a IBM y regresa {pending}; de ahí
   poll cada 4 s hasta que la cola real lo suelte. La espera es la de verdad. */
async function fetchVolado(onWait) {
  let res = await fetchJson(API);
  while (res.pending) {
    if (onWait) onWait(res);
    await new Promise(r => setTimeout(r, 4000));
    res = await fetchJson(API + '?job=' + res.pending);
  }
  return res;
}

async function fetchJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);   // cada poll es corto; corta por si acaso
  try {
    const res = await fetch(url, { headers: { 'accept': 'application/json' }, signal: ctrl.signal });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const err = new Error('backend ' + res.status); err.code = body.error;
      throw err;
    }
    return res.json();
  } finally { clearTimeout(timer); }
}

/* Límite diario en localStorage. Se brinca con incógnito: es fricción, no seguridad. */
const KEY = 'volado.quota';
// fecha local: debe coincidir con resetCountdown() (medianoche local), no UTC
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

function quota() {
  let q;
  try { q = JSON.parse(localStorage.getItem(KEY)); } catch { q = null; }
  if (!q || q.day !== today()) q = { day: today(), used: 0, bonus: 0 };
  return q;
}
const saveQuota = q => { try { localStorage.setItem(KEY, JSON.stringify(q)); } catch {} };
const left = () => { const q = quota(); return DAILY_LIMIT + q.bonus - q.used; };
function spend() { const q = quota(); q.used++; saveQuota(q); }
function grantBonus() { const q = quota(); q.bonus++; saveQuota(q); }

function resetCountdown() {
  const now = new Date();
  const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
  const mins = Math.floor((midnight - now) / 60000);
  return `${Math.floor(mins / 60)} h ${mins % 60} m`;
}

/* i18n */
const I18N = {
  es: {
    capYes: '|0⟩ águila · sí', capNo: '|1⟩ sol · no',
    circuitLabel: 'el circuito completo', circuitC1: '// superposición', circuitC2: '// y aquí decide el universo',
    leastBusy: 'la máquina menos ocupada',
    spinning: 'Girando. Todavía no es ni sí ni no.',
    howLink: '¿Cómo funciona?', measuring: 'midiendo',
    waitLive: r => r.status === 'submitting' ? 'mandando tu job a la máquina real…'
      : r.status === 'queued' ? `en la fila de IBM (${r.queue ?? '?'} trabajos al entrar)…`
      : 'corriendo en la máquina real…',
    tagShots: '1 qubit · 1,000 tiros', tagReal: 'hardware real de IBM',
    title: 'Échate un volado<br>que nadie puede cargar.',
    lede: 'Pregunta lo que sea de sí o no. La moneda es un qubit en una computadora cuántica de IBM: no hay fórmula, no hay semilla, no hay truco. Ni el universo sabía el resultado antes de que lo midiéramos.',
    qLabel: 'Tu pregunta', placeholder: '¿Le mando mensaje o ya la dejo morir?',
    cta: 'Tirar el volado cuántico', noStore: 'no guardamos tu pregunta',
    freebie: 'Gratis y sin cola: si tu pregunta es “¿vuelvo con mi ex?”, es no. Quiérete. Esa no necesita un qubit.',
    yourQ: 'Tu pregunta', distro: 'Distribución de las 1,000 mediciones',
    yes: 'sí', no: 'no', processor: 'Procesador', runtime: 'Tiempo de ejecución', queue: 'Cola',
    again: 'Otro volado', share: 'Ponlo en el muro', shared: '✓ en el muro',
    sharedTitle: 'Volados compartidos', sharedNote: 'Solo salen aquí los que alguien decidió compartir.',
    limitTitle: `Ya te echaste ${DAILY_LIMIT} volados hoy`,
    limitBody: 'Cinco decisiones en un día ya es bastante destino por hoy. Mañana el universo abre otra vez.',
    resetsIn: 'se reinicia en', comeBack: 'Mañana vuelvo', watchAd: 'Ver anuncio y ganar 1 volado',
    VERDICT: ['SÍ', 'NO'],
    margin: (w, l) => `Ganó por ${w} a ${l}. No hay recuento.`,
    tie: `Quedó ${SHOTS / 2} a ${SHOTS / 2}. El último tiro desempató. Tampoco hay recuento.`,
    logLines: j => [
      `→ leyendo bits del job ${j.id} · IBM Quantum`,
      `→ backend: ${j.backend} · ${j.chip}`,
      `→ cola al entrar tu job: ${j.queue} trabajos`,
      `→ h q[0]; measure q[0]; · ${SHOTS} shots`
    ],
    slotLead970: 'Anuncio · leaderboard 970×90',
    slot728: 'Anuncio · 728×90',
    slotResult: 'Anuncio bajo resultado · 728×90',
    slotReward: 'Anuncio recompensado · 300×250',
    slot300: 'Anuncio 300×250',
    slot600: 'Anuncio 300×600',
    slotSticky: 'Anuncio pegado · 970×60',
    fHome: 'Inicio', fHow: '¿Cómo funciona?', fLegal: 'Privacidad y términos',
    fCredit: 'Hecho por el mame. Diseñado con Claude.',
    error: 'Se cayó la conexión con IBM. Intenta otra vez.',
    cooldown: 'Ya se acabaron los volados de hoy: hay un tope diario de jobs pa que los 10 minutos del mes alcancen. Vuelve mañana.'
  },
  en: {
    capYes: '|0⟩ heads · yes', capNo: '|1⟩ tails · no',
    circuitLabel: 'the entire circuit', circuitC1: '// superposition', circuitC2: '// and here the universe decides',
    leastBusy: 'whichever machine is least busy',
    spinning: 'Still spinning. Not yes, not no.',
    howLink: 'How it works', measuring: 'measuring',
    waitLive: r => r.status === 'submitting' ? 'sending your job to the real machine…'
      : r.status === 'queued' ? `in IBM’s queue (${r.queue ?? '?'} jobs ahead at entry)…`
      : 'running on the real machine…',
    tagShots: '1 qubit · 1,000 shots', tagReal: 'real IBM hardware',
    title: 'Flip a coin<br>nobody can rig.',
    lede: 'Ask anything with a yes-or-no answer. The coin is a qubit on an IBM quantum computer: no formula, no seed, no trick. Not even the universe knew the answer before we measured it.',
    qLabel: 'Your question', placeholder: 'Should I text them back?',
    cta: 'Flip the quantum coin', noStore: 'we never store your question',
    freebie: 'Free of charge, no queue: if your question is “should I get back with my ex?”, it\'s a no. Love yourself. That one doesn\'t need a qubit.',
    yourQ: 'Your question', distro: 'Distribution across 1,000 measurements',
    yes: 'yes', no: 'no', processor: 'Processor', runtime: 'Execution time', queue: 'Queue',
    again: 'Flip again', share: 'Post it to the wall', shared: '✓ on the wall',
    sharedTitle: 'Shared flips', sharedNote: 'Only the ones people chose to share show up here.',
    limitTitle: `That's ${DAILY_LIMIT} flips today`,
    limitBody: 'Five decisions in one day is enough destiny already. The universe reopens tomorrow.',
    resetsIn: 'resets in', comeBack: 'Back tomorrow', watchAd: 'Watch an ad, get 1 flip',
    VERDICT: ['YES', 'NO'],
    margin: (w, l) => `Won ${w} to ${l}. No recount.`,
    tie: `It landed ${SHOTS / 2} to ${SHOTS / 2}. The last shot broke the tie. Still no recount.`,
    logLines: j => [
      `→ reading bits from job ${j.id} · IBM Quantum`,
      `→ backend: ${j.backend} · ${j.chip}`,
      `→ queue when your job entered: ${j.queue} jobs`,
      `→ h q[0]; measure q[0]; · ${SHOTS} shots`
    ],
    slotLead970: 'Ad · leaderboard 970×90',
    slot728: 'Ad · 728×90',
    slotResult: 'Ad below result · 728×90',
    slotReward: 'Rewarded ad · 300×250',
    slot300: 'Ad 300×250',
    slot600: 'Ad 300×600',
    slotSticky: 'Anchored ad · 970×60',
    fHome: 'Home', fHow: 'How it works', fLegal: 'Privacy and terms',
    fCredit: 'Built for the joke. Designed with Claude.',
    error: 'Lost the connection to IBM. Try again.',
    cooldown: 'Today’s flips are gone: there is a daily job cap so the month’s 10 minutes last. Come back tomorrow.'
  }
};

if (window.VOLADO.ADS) {
  I18N.es.limitBody = 'Cinco decisiones en un día ya es bastante destino por hoy. Ve un anuncio de 15 segundos y te doy otro tiro; los qubits no se pagan solos.';
  I18N.en.limitBody = 'Five decisions in one day is enough destiny already. Watch a 15-second ad and I\'ll give you one more; qubits don\'t pay for themselves.';
}

let lang = 'es';
try { lang = localStorage.getItem('volado.lang') || 'es'; } catch {}
if (!I18N[lang]) lang = 'es';   // valor viejo o basura: no revientes la página

let sharedItems = [];   // cache pa re-pintar el riel al cambiar idioma

function applyLang() {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = t[el.dataset.i18nPh];
    if (v) el.placeholder = v;
  });
  document.getElementById('resetIn').textContent = resetCountdown();
  paintShared(sharedItems);   // re-pinta SÍ/NO en el idioma nuevo
  try { localStorage.setItem('volado.lang', lang); } catch {}
}

/* Flujo */
const $ = s => document.querySelector(s);
const setState = s => { document.body.dataset.state = s; window.scrollTo(0, 0); };

$('#askForm').addEventListener('submit', async e => {
  e.preventDefault();
  const question = $('#q').value.trim();
  if (!question) return;

  if (left() <= 0) {
    $('#resetIn').textContent = resetCountdown();
    $('#limitModal').hidden = false;
    return;
  }

  const t = I18N[lang];
  $('#echoQ').textContent = '“' + question + '”';
  $('#log').innerHTML = '';
  setState('measuring');

  let data;
  const started = performance.now();
  try {
    data = await fetchVolado(r => {
      const d = document.createElement('div');
      d.className = 'live';
      d.textContent = t.waitLive(r);
      $('#log').replaceChildren(d);
    });
  } catch (err) {
    $('#log').innerHTML = `<div class="live">${err.code === 'cooldown' ? t.cooldown : t.error}</div>`;
    setTimeout(() => setState('home'), 2600);
    return;
  }
  spend();   // el server ya gastó los bits; cuenta ya, no tras la animación (recargar no da tiro gratis)

  const lines = t.logLines(data.job);
  lines.forEach((line, i) => setTimeout(() => {
    const d = document.createElement('div');
    if (i === lines.length - 1) d.className = 'live';
    d.textContent = line;
    $('#log').appendChild(d);
  }, i * 380));

  // mínimo 1.8 s en pantalla: la espera es parte del producto
  const waited = performance.now() - started;
  setTimeout(() => { render(question, data); setState('result'); },
             Math.max(1800 - waited, lines.length * 380));
});

let lastFlip = null;   // pa /api/share

function render(question, data) {
  const t = I18N[lang];
  const { bit, counts, job } = data;
  lastFlip = { q: question, bit };
  const yes = counts.zero, no = counts.one;

  $('#resQ').textContent = '“' + question + '”';
  $('#verdict').textContent = t.VERDICT[bit];
  $('#margin').textContent = yes === no ? t.tie : (bit === 0 ? t.margin(yes, no) : t.margin(no, yes));

  setBar($('#barYes'), yes, bit === 0);
  setBar($('#barNo'), no, bit === 1);

  $('#mBackend').textContent = job.backend;
  $('#mChip').textContent = job.chip;
  $('#mMs').textContent = job.execMs.toLocaleString() + ' ms';
  $('#mQueue').textContent = job.queue;
  $('#mJob').textContent = job.id + ' ↗';
  $('#mJob').href = job.url;

  // historial local, nunca sale del navegador
  let hist = [];
  try { hist = JSON.parse(localStorage.getItem('volado.history') || '[]'); } catch {}
  hist.unshift({ q: question, bit, at: Date.now() });
  try { localStorage.setItem('volado.history', JSON.stringify(hist.slice(0, 20))); } catch {}
}

function setBar(el, n, win) {
  el.classList.toggle('win', win);
  el.querySelector('.track i').style.width = (n / SHOTS * 100).toFixed(1) + '%';
  el.querySelector('.n').textContent = n;
}

$('#again').addEventListener('click', () => {
  $('#q').value = '';
  $('#share').textContent = I18N[lang].share;   // limpia el '✓' del volado anterior
  setState('home'); $('#q').focus();
});

// Compartir = publicar en el muro de la página. Nada sale a redes ni al portapapeles.
$('#share').addEventListener('click', async () => {
  const flip = lastFlip;
  if (!flip) return;
  lastFlip = null;   // un solo post por volado, aunque den doble click
  try {
    await fetch('/api/share', { method: 'POST', body: JSON.stringify(flip) });
    $('#share').textContent = I18N[lang].shared;
    loadShared();   // aparece en el muro al instante
  } catch { lastFlip = flip; }   // falló: deja reintentar
});

$('#limitClose').addEventListener('click', () => { $('#limitModal').hidden = true; });
$('#rewardAd').hidden = !window.VOLADO.ADS;   // sin ads no se promete anuncio
$('#rewardAd').addEventListener('click', () => {
  // TODO: ad recompensado real; grantBonus() solo al terminar de verse
  grantBonus();
  $('#limitModal').hidden = true;
  $('#askForm').requestSubmit();
});

document.querySelectorAll('input[name="lang"]').forEach(r =>
  r.addEventListener('change', () => { lang = r.value; applyLang(); }));

// textContent, nunca innerHTML: las preguntas vienen de extraños
function paintShared(items) {
  document.querySelector('.aside').hidden = !items.length;
  $('#sharedList').replaceChildren(...items.map(({ q, bit }) => {
    const row = document.createElement('div');
    const b = document.createElement('b');
    if (bit === 0) b.className = 'si';
    b.textContent = I18N[lang].VERDICT[bit];
    const s = document.createElement('span');
    s.style.color = 'var(--color-neutral-400)';
    s.textContent = q;
    row.append(b, s);
    return row;
  }));
}
async function loadShared() {
  try { sharedItems = await (await fetch('/api/shared')).json(); }
  catch { sharedItems = []; }
  paintShared(sharedItems);
}
loadShared();

const langRadio = document.querySelector(`input[name="lang"][value="${lang}"]`);
if (langRadio) langRadio.checked = true;
applyLang();
