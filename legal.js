/* Textos ES/EN del aviso de privacidad y los términos.
   Comparte la llave 'volado.lang' con el resto del sitio. */

const I18N = {
  es: {
    back: '← Échate uno',
    kicker: 'Lo aburrido pero necesario',
    h1: 'Aviso de privacidad y términos',
    lede: 'Escrito en español normal, no en abogadés. La versión corta: tu pregunta no sale de tu navegador (salvo que tú la compartas) y no tengo forma de saber quién eres.',
    updated: 'Última actualización: agosto de 2026',

    dataH: 'Qué datos toca esta página',
    dataP: 'No hay cuentas, no hay registro, no te pido tu correo. Esto es todo lo que existe:',
    r1k: 'Tu pregunta',
    r1v: '<strong>No sale de tu navegador</strong> salvo que tú toques <em>Compartir</em>. Al echar el volado el servidor solo entrega un bit (0 o 1); no sabe qué preguntaste ni le hace falta. Si decides compartir, ahí sí tu pregunta y el resultado se envían al servidor y se publican en el muro de “Volados compartidos” (se guardan los últimos 50). Si no compartes, no se manda, no se guarda, no se lee.',
    r2k: 'Tu historial',
    r2v: 'Tus últimos volados y el contador diario viven en el <strong>almacenamiento local</strong> de tu navegador, en tu propio equipo. Nunca se envían. Bórralos cuando quieras limpiando los datos del sitio.',
    r3k: 'Registros del servidor',
    r3v: 'Como cualquier sitio web, el servidor registra la dirección IP y la hora de cada petición para que funcione y no lo tumben. Los registros <strong>se rotan automáticamente</strong> y los viejos se descartan; no se guardan para siempre ni se usan para perfilarte.',
    r4k: 'IBM Quantum',
    r4v: 'El sitio le pide bits aleatorios a IBM a nombre de <strong>una sola cuenta, la mía</strong>. IBM no recibe nada tuyo: ni tu IP, ni tu pregunta, ni un identificador. Solo ve trabajos míos.',

    n1: 'No uso cookies.',
    n2: 'No hay analítica, ni Google Analytics, ni píxeles de nadie.',
    n3: 'No hay publicidad ni rastreo de terceros.',
    n4: 'No vendo, comparto ni transfiero datos, porque no tengo ninguno que vender.',

    c1: '<strong style="color:var(--color-text);font-weight:500">¿Y el banner de cookies?</strong> No hay banner porque no hay cookies. Un aviso de consentimiento solo es obligatorio cuando el sitio guarda cosas que no son indispensables para que funcione, y aquí lo único que se guarda es tu contador de volados, en tu propio equipo.',
    c2: 'El día que este sitio tenga publicidad, aparecerá el aviso de consentimiento correspondiente antes de cargar cualquier anuncio, y esta página se actualizará para decir exactamente qué cambió.',

    rightsH: 'Tus derechos',
    rightsP: 'La ley mexicana (Ley Federal de Protección de Datos Personales en Posesión de los Particulares) te da derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos personales. Si vives en la Unión Europea o el Reino Unido, el RGPD te da derechos equivalentes.',
    rightsP2: 'Aquí eso es fácil de ejercer: como no guardo datos personales identificables, no hay nada que consultar ni que borrar de mi lado. Lo poco que existe (tu historial, tu contador) lo borras tú vaciando los datos del sitio en tu navegador. Si aun así quieres preguntar algo o pedir que borre un registro, escríbeme un issue en el repositorio y te contesto ahí, a la vista de todos.',
    rightsP3: 'Responsable del tratamiento: la persona que mantiene este sitio, desde México. Contacto: <a href="https://github.com/uno21858/elvolado/issues" target="_blank" rel="noopener">github.com/uno21858/elvolado/issues</a>.',

    termsH: 'Términos de uso',
    termsLede: 'Cinco puntos. Ninguno tiene letras chiquitas.',
    t1: '<b>Esto es un juguete.</b> Sirve para echar un volado, no para tomar decisiones médicas, legales, financieras ni de vida. Si le haces caso a un qubit para algo importante, la responsabilidad es enteramente tuya.',
    t2: '<b>El azar es real, el consejo no.</b> El bit viene de una medición cuántica genuina, y por eso mismo no sabe nada de ti ni de tu situación. Un resultado no es una recomendación.',
    t3: '<b>El servicio se ofrece tal cual.</b> Corre sobre una cuota gratuita de IBM y un servidor casero. Puede estar caído, lento o sin tiempo cuántico disponible, sin aviso previo y sin que nadie te deba nada.',
    t4: '<b>No lo automatices.</b> Hay un límite de volados al día precisamente porque el tiempo de máquina es compartido entre todos los visitantes. Si lo scripteas, te estás quedando con el turno de alguien más.',
    t5: '<b>El código es abierto, el sitio es mío.</b> El código está bajo licencia MIT y puedes hacer con él lo que quieras. El nombre, el diseño y este dominio no van incluidos.',

    verifyH: 'Y si no me crees',
    verifyP: 'Todo lo que dice esta página se puede verificar. El código del sitio y del servidor es <strong>público</strong>: puedes leer exactamente qué se manda, qué se guarda y qué no. Si encuentras que algo aquí no coincide con el código, es un error mío y quiero saberlo.',

    fHome: 'Inicio', fHow: '¿Cómo funciona?', fLegal: 'Privacidad y términos',
    fCredit: 'Hecho por el mame. Diseñado con Claude.',
    slot728: 'Anuncio · 728×90',
    slotSticky: 'Anuncio pegado · 970×60'
  },

  en: {
    back: '← Go flip one',
    kicker: 'The boring but necessary part',
    h1: 'Privacy notice and terms',
    lede: 'Written in plain language, not legalese. Short version: your question never leaves your browser (unless you share it) and I have no way of knowing who you are.',
    updated: 'Last updated: August 2026',

    dataH: 'What data this page touches',
    dataP: 'No accounts, no sign-up, I never ask for your email. This is everything that exists:',
    r1k: 'Your question',
    r1v: '<strong>It never leaves your browser</strong> unless you tap <em>Share</em>. When you flip, the server only hands back a bit (0 or 1); it does not know what you asked and does not need to. If you choose to share, then your question and the result are sent to the server and posted on the public “Shared flips” wall (last 50 kept). If you do not share, nothing is sent, stored or read.',
    r2k: 'Your history',
    r2v: 'Your recent flips and the daily counter live in your browser’s <strong>local storage</strong>, on your own device. They are never transmitted. Clear the site data whenever you want and they are gone.',
    r3k: 'Server logs',
    r3v: 'Like any website, the server records the IP address and timestamp of each request so it works and does not get knocked over. Logs <strong>rotate automatically</strong> and old ones are dropped; they are not kept forever and are not used to profile you.',
    r4k: 'IBM Quantum',
    r4v: 'The site requests random bits from IBM under <strong>one single account, mine</strong>. IBM receives nothing of yours: not your IP, not your question, not an identifier. It only ever sees my jobs.',

    n1: 'No cookies.',
    n2: 'No analytics, no Google Analytics, no pixels from anyone.',
    n3: 'No advertising and no third-party tracking.',
    n4: 'I do not sell, share or transfer data, because I have none to sell.',

    c1: '<strong style="color:var(--color-text);font-weight:500">So where is the cookie banner?</strong> There is no banner because there are no cookies. A consent notice is only required when a site stores things that are not strictly necessary for it to work, and the only thing stored here is your flip counter, on your own device.',
    c2: 'The day this site carries advertising, the corresponding consent notice will appear before any ad loads, and this page will be updated to say exactly what changed.',

    rightsH: 'Your rights',
    rightsP: 'Mexican law (the Federal Law on Protection of Personal Data Held by Private Parties) gives you the right to access, rectify, cancel and object to the processing of your personal data. If you live in the European Union or the United Kingdom, the GDPR gives you equivalent rights.',
    rightsP2: 'Here that is easy to exercise: since I hold no identifiable personal data, there is nothing to look up or delete on my end. The little that exists (your history, your counter) you delete yourself by clearing the site data in your browser. If you still want to ask something or request that a log be removed, open an issue on the repository and I will answer there, in public.',
    rightsP3: 'Data controller: the person who maintains this site, based in Mexico. Contact: <a href="https://github.com/uno21858/elvolado/issues" target="_blank" rel="noopener">github.com/uno21858/elvolado/issues</a>.',

    termsH: 'Terms of use',
    termsLede: 'Five points. None of them in fine print.',
    t1: '<b>This is a toy.</b> It is for flipping a coin, not for medical, legal, financial or life decisions. If you act on a qubit for something that matters, that is entirely on you.',
    t2: '<b>The randomness is real, the advice is not.</b> The bit comes from a genuine quantum measurement, which is exactly why it knows nothing about you or your situation. A result is not a recommendation.',
    t3: '<b>The service is provided as is.</b> It runs on a free IBM quota and a home server. It may be down, slow, or out of quantum time without warning, and nobody owes you anything.',
    t4: '<b>Do not automate it.</b> There is a daily limit precisely because machine time is shared across every visitor. If you script it, you are taking someone else’s turn.',
    t5: '<b>The code is open, the site is mine.</b> The code is MIT licensed and you can do whatever you want with it. The name, the design and this domain are not included.',

    verifyH: 'And if you do not believe me',
    verifyP: 'Everything on this page can be verified. The site and server code is <strong>public</strong>: you can read exactly what is sent, what is stored and what is not. If you find something here that does not match the code, that is my mistake and I want to know.',

    fHome: 'Home', fHow: 'How it works', fLegal: 'Privacy and terms',
    fCredit: 'Built for the joke. Designed with Claude.',
    slot728: 'Ad · 728×90',
    slotSticky: 'Anchored ad · 970×60'
  }
};

let lang = 'es';
try { lang = localStorage.getItem('volado.lang') || 'es'; } catch {}
if (!I18N[lang]) lang = 'es';

function applyLang() {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v) el.innerHTML = v;
  });
  try { localStorage.setItem('volado.lang', lang); } catch {}
}

document.querySelectorAll('input[name="lang"]').forEach(r =>
  r.addEventListener('change', () => { lang = r.value; applyLang(); }));

const langRadio = document.querySelector(`input[name="lang"][value="${lang}"]`);
if (langRadio) langRadio.checked = true;
applyLang();
