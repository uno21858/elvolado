/* Idioma de la página "¿Cómo funciona?". Comparte la llave con index.html
   (localStorage 'volado.lang'), así que el switch se respeta entre páginas. */

const I18N = {
  es: {
    back: '← Échate uno',
    kicker: 'Peras con manzanas',
    h1: 'Por qué esto sí es aleatorio<br>y tu computadora no',
    lede: 'Sin matemáticas. Cuatro pasos y ya le entendiste mejor que el 99% del internet. Y al final, la parte que nadie te cuenta.',

    s1h: 'Tu computadora no sabe echar volados',
    s1p: 'Cuando una app dice “número al azar”, en realidad está aplicando una receta: agarra un número inicial (la hora, por ejemplo), lo revuelve con una fórmula y escupe un resultado. Se ve desordenado, pero es una receta. Si alguien conoce el número inicial, puede calcular <em>todos</em> los resultados que vienen. Es una baraja que parece revuelta pero siempre se revuelve igual.',
    s1code: 'semilla 1690 → 0.7241 → 0.1183 → 0.9042 &nbsp;<em>// siempre en ese orden</em>',
    s2h: 'Un qubit sí, porque no está decidido todavía',
    s2p: 'Un qubit es una partícula que puede estar en 0, en 1… o en los dos a la vez. Le aplicamos una compuerta llamada <strong>Hadamard</strong>, que lo deja justo a la mitad: 50% de 0, 50% de 1. No es que <em>no sepamos</em> en cuál está. Es que literalmente <em>no está</em> en ninguno de los dos todavía. Como una moneda que sigue girando en el aire y además no tiene cara todavía.',
    s2or: '0 ó 1',
    s2note: 'El circuito completo. Es de una línea: <span class="mono" style="color:var(--color-neutral-400)">h q[0]; measure q[0];</span>',
    s3h: 'Al medirlo, el universo tira la moneda',
    s3p: 'En el momento en que lo medimos, el qubit tiene que decidirse: sale 0 o sale 1. Y hasta donde sabe la física, <strong>nada ni nadie</strong> determina cuál, ni el hardware, ni IBM, ni una fórmula escondida. No es que el resultado ya estuviera ahí y no lo viéramos: es que no existía. Por eso esto no es “aleatorio de mentiritas”: es el único azar que no le debe nada a una receta.',
    s4h: 'Lo hacemos mil veces y gana la mayoría',
    s4p: 'Una sola medición ya sería suficiente, pero mil se ve mucho mejor y cuesta lo mismo. Corremos 1,000 shots: te enseñamos cuántas veces salió 0 (sí) y cuántas 1 (no), y la que gane es tu respuesta. Casi siempre queda como 507-493. Ese poquito de diferencia es tu destino, sí, así de frágil.',

    mythH: 'Ahora la parte que nadie te cuenta',
    mythLede: 'Todo lo que crees de la computación cuántica lo aprendiste de un thumbnail de YouTube. Vamos a arreglar eso, porque la realidad es mucho más chafa y mucho más interesante.',
    mythColA: 'Lo que todos creen', mythColB: 'Lo que de verdad pasa',
    m1a: '“Es instantánea, prueba todas las respuestas a la vez.”',
    m1b: 'El <strong>lote</strong> del que salió tu bit hizo cola en una máquina real. Hay una fila de trabajos de físicos, universidades y empresas, y el nuestro se formó atrás. Correrlo son unos segundos; la espera en la fila puede ser de minutos o de horas. No hay nada instantáneo en esto.',
    m2a: '“Es millones de veces más rápida que una computadora normal.”',
    m2b: 'Para <strong>casi todo</strong>, es ridículamente más lenta. Es más rápida solo en un puñado de problemas muy específicos, y ni en esos ha ganado todavía de forma útil. Tu celular hace este mismo volado en 0.00001 ms. La máquina de IBM se tarda unos 30 segundos en correr el lote de tiros, más la fila.',
    m3a: '“Los qubits son perfectos, es tecnología del futuro.”',
    m3b: 'Se equivocan <strong>todo el tiempo</strong>. Un qubit pierde su estado en microsegundos porque cualquier vibración, calor o campo magnético lo tumba. Por eso el chip vive a 15 milikelvin, más frío que el espacio exterior. Alrededor del 1% de las mediciones salen mal nomás porque sí.',
    m4a: '“Ya van a romper toda la criptografía del mundo.”',
    m4b: 'Para eso harían falta <strong>millones</strong> de qubits estables con corrección de errores. Hoy los mejores chips tienen entre mil y unos pocos miles, y son ruidosos. Faltan años, quizá décadas.',
    m5a: '“La superposición te deja sacar mucha información de golpe.”',
    m5b: 'Es al revés: en cuanto mides, la superposición <strong>se acaba</strong> y te llevas un solo bit. Un qubit en superposición no te da dos respuestas, te da una, y de paso destruye el estado. Literalmente todo lo que esta página aprovecha de la mecánica cuántica es ese único bit.',
    punch1: 'O sea: estamos usando la computadora más cara y más fría del planeta, con una fila de científicos esperando turno, para hacer exactamente lo que una moneda de diez pesos hace gratis en el aire.',
    punch2: 'Esa es la broma. Pero también es lo único de esta página que no es broma: el bit que te tocó es de verdad impredecible, y eso una moneda no te lo puede prometer.',
    punch3: 'Ah, y no me hago responsable si le haces caso.',

    adsH: '¿Y por qué tanto anuncio?',
    adsLede: 'La respuesta es incómoda pero simple: el chiste es carísimo.',
    f1k: 'Lo que IBM regala', f1n: 'de máquina cuántica al mes, gratis. Es generoso y se agradece, pero es todo.',
    f2k: 'Lo que cuesta después', f2n: 'o sea unos <strong>$96 dólares el minuto</strong>. No es error de dedo.',
    f3k: 'Lo que junta un anuncio', f3n: 'por visita, más o menos, con tráfico de México.',
    adsP1: 'Tu volado gasta como <strong>2 segundos</strong> de procesador. Fuera de la cuota gratis, eso son <strong>$3.20 dólares</strong>. Un anuncio deja centésimas de centavo. Harían falta <strong>unas 2,000 visitas</strong> para pagar un solo volado.',
    adsP2: 'Los anuncios no van a pagar tiempo cuántico. Ayudan con el dominio y el servidor. Están ahí porque el sitio es gratis y no te pido nada más: ni cuenta, ni correo, ni tu pregunta.',
    shareH: 'Y los 10 minutos no son tuyos, son de todos',
    shareP1: 'Esta es la parte importante. Los 10 minutos son de <strong>una sola cuenta</strong>, la mía, y se reparten entre <strong>todas</strong> las personas que entran a la página. No son 10 minutos por visitante. Cada volado que echas le quita tiempo al que sigue.',
    shareP2: 'Los bits vienen en lotes: un job grande gasta ~30 segundos de máquina y alcanza para ~100 volados, así que cada volado sale como a <strong>0.3 segundos</strong>. Con eso el mes entero da para unos <strong>2,000</strong>. Si un día esto se llena de gente, se pueden acabar antes de fin de mes, y la página te lo va a decir: se acabó, vuelve el mes que entra.',
    shareP3: 'Nota: IBM tiene una promoción de 180 minutos al año para cuentas que ya usaron 20. Si esto llega hasta allá, el límite sube y lo aviso aquí.',
    repoH: 'Todo el código está a la vista',
    repoP1: 'Para que nadie diga que está arreglado: el repo es <strong>público</strong>, front y backend. Puedes leer exactamente cómo se pide el bit, cómo se cuenta y qué se guarda. Lo único que no está ahí son las llaves de IBM, que viven en un <span class="mono">.env</span> que nunca se sube y que el contenedor lee al arrancar.',
    repoP2: 'Si encuentras que estoy haciendo trampa, ábreme un issue y lo pongo en la portada.',
    repoLink: 'Front, backend y el Dockerfile. Léelo antes de acusarme.',

    fleetH: '¿Y en qué máquina te tocó?',
    fleetLede: 'No hay una sola computadora cuántica. IBM tiene una flota, y tu volado cae en la que esté libre.',
    fleetP1: 'Los bits no se piden de uno en uno; sería quemar los 10 minutos en nada. El programa pide un <strong>lote grande</strong> de una sola vez a la máquina que esté <strong>operativa</strong> (no en mantenimiento) y con <strong>menos cola</strong> —eso es <span class="mono">service.least_busy()</span>—, y guarda las respuestas en una <strong>reserva</strong> (un pool). Tu volado sale de esa reserva <strong>al instante</strong>: la fila de minutos u horas ya la esperó el lote antes, tú no esperas nada. Por eso el nombre cambia cada tanto: cambia cuando se pide un lote nuevo, no en cada pregunta.',
    fleetP2: 'Por eso la tabla del resultado te dice en qué máquina se corrió el lote y cuánto tardó: no es adorno, es la prueba de que los bits salieron de hardware real y no de un <span class="mono">Math.random()</span>. Si el lote cayó en una con 60 trabajos formados adelante, tardó: hay físicos de verdad usando esa misma máquina, y su experimento probablemente importa más que tu duda.',
    fleetP2b: '¿Y por qué usamos <strong>un solo qubit</strong> si cada máquina trae 156? Porque un volado es un bit: sí o no. Medir los 156 no daría un volado “mejor”, daría 156 volados de golpe que no pedimos. Y cada qubit extra es una pieza más que puede fallar: son delicados y se equivocan solos como el 1% de las veces. El circuito más honesto es el más chico —un qubit, una compuerta, una medición— y los otros 155 se quedan quietos sin meter ruido.',
    fl1m: 'Heron r2 · 156 qubits', fl1n: 'Casi siempre la más ocupada. Hay días con 60+ jobs formados.',
    fl2m: 'Heron r2 · 156 qubits', fl2n: 'La de la cola corta. De aquí salieron nuestros primeros bits.',
    fl3m: 'Heron r2 · 156 qubits', fl3n: 'La tercera Heron. Igual de buena para un bit.',
    fl4m: 'retirada · nov 2025', fl4n: 'Estuvo años en todos los tutoriales. Ya no existe, y eso también dice mucho de qué tan joven es esto.',
    fleetP3: 'La flota cambia: IBM prende y apaga máquinas cada pocos meses. Por eso el sitio nunca trae un nombre escrito a mano, pregunta cuáles hay antes de pedir cada lote.',

    thQubit: 'Un qubit medido',
    tr1: 'De dónde sale', tr1a: 'Una fórmula con semilla', tr1b: 'Una medición física',
    tr2: '¿Se puede predecir?', tr2a: 'Sí, si conoces la semilla', tr2b: 'No. Nunca. Por principio',
    tr3: '¿Se repite?', tr3a: 'Sí, la secuencia es fija', tr3b: 'No existe una secuencia',
    tr4: 'Cuánto tarda', tr4b: '~30 s el lote, más cola',
    tableNote: 'Sí, es infinitamente más lento y más caro para decidir si pides tacos. Ese es el punto.',

    srcH: 'Fuentes',
    srcLede: 'Nada de esto me lo inventé. Si quieres profundizar, empieza aquí.',
    src1: '3Blue1Brown con MinutePhysics. La mejor explicación visual de qué es una superposición y por qué medir cambia las cosas. <a href="https://www.youtube.com/watch?v=MzRCDLre1b4" target="_blank" rel="noopener">Ver en YouTube</a>.',
    src2: 'Cursos gratis de IBM, desde cero. Aquí está la compuerta Hadamard bien explicada, con el circuito que usa esta página.',
    src3t: 'Documentación de IBM Quantum',
    src3: 'La referencia técnica: cómo se manda un job, qué es <span class="mono">least_busy</span>, y qué máquinas existen hoy.',
    src4t: 'Actualizaciones de producto de IBM',
    src4: 'De dónde salen los datos de la flota, el retiro de <span class="mono">ibm_brisbane</span> en noviembre de 2025 y los minutos del plan abierto.',
    src5: 'Por si te quedaste con la duda de por qué alguien se tomaría la molestia de buscar azar de verdad.',
    credit: 'Esta página, el diseño, el texto y el código, la armé con <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a>. Los datos de la máquina en cada resultado salen directo de la API de IBM, no de un texto escrito a mano.',
    cta: 'Échate un volado',

    cardFleetK: 'La flota', cardFleetT: '3 máquinas abiertas',
    cardFleetB: '156 qubits cada una, enfriadas a 15 milikelvin, más frío que el espacio exterior. Tu volado cae en la que tenga menos cola y no esté en mantenimiento.',
    cardFleetL: 'Ver en IBM Quantum ↗',
    cardFundK: 'El fondo cuántico',
    cardFundB: 'restantes de los 10 minutos que IBM regala este mes.',
    cardFundB2: 'Los anuncios llevan comprados <strong style="color:var(--color-text);font-weight:500">0 s</strong> extra.',
    cardFundL: '¿Por qué tanto anuncio? ↓',
    slotLead970: 'Anuncio · leaderboard 970×90',
    slot728: 'Anuncio · 728×90',
    slotResult: 'Anuncio bajo resultado · 728×90',
    slotReward: 'Anuncio recompensado · 300×250',
    slot300: 'Anuncio 300×250',
    slot600: 'Anuncio 300×600',
    slotSticky: 'Anuncio pegado · 970×60',
    fHome: 'Inicio', fHow: '¿Cómo funciona?', fLegal: 'Privacidad y términos',
    fCredit: 'Hecho por el mame. Diseñado con Claude.',
    barWhy: '¿por qué tanto anuncio?'
  },

  en: {
    back: '← Go flip one',
    kicker: 'Plain language',
    h1: 'Why this is actually random<br>and your computer is not',
    lede: 'No math. Four steps and you will understand it better than 99% of the internet. And at the end, the part nobody tells you.',

    s1h: 'Your computer cannot flip a coin',
    s1p: 'When an app says “random number”, it is really following a recipe: it takes a starting number (the clock, say), stirs it with a formula and spits out a result. It looks messy, but it is a recipe. If someone knows the starting number, they can compute <em>every</em> result that follows. It is a deck that looks shuffled but always shuffles the same way.',
    s1code: 'seed 1690 → 0.7241 → 0.1183 → 0.9042 &nbsp;<em>// always in that order</em>',
    s2h: 'A qubit can, because it has not decided yet',
    s2p: 'A qubit is a particle that can be 0, or 1, or both at once. We apply a gate called <strong>Hadamard</strong>, which leaves it exactly in the middle: 50% zero, 50% one. It is not that we <em>do not know</em> which one it is. It literally <em>is not</em> either one yet. Like a coin still spinning in the air that does not even have a face yet.',
    s2or: '0 or 1',
    s2note: 'The entire circuit. It is one line: <span class="mono" style="color:var(--color-neutral-400)">h q[0]; measure q[0];</span>',
    s3h: 'When we measure it, the universe flips the coin',
    s3p: 'The moment we measure, the qubit has to pick: 0 or 1. And as far as physics knows, <strong>nothing and nobody</strong> decides which, not the hardware, not IBM, not a hidden formula. It is not that the answer was already there and we could not see it: it did not exist. That is why this is not fake randomness. It is the only kind that owes nothing to a recipe.',
    s4h: 'We do it a thousand times and the majority wins',
    s4p: 'One measurement would be enough, but a thousand looks much better and costs the same. We run 1,000 shots, show you how many came out 0 (yes) and how many 1 (no), and whichever wins is your answer. It usually lands around 507-493. That tiny gap is your destiny.',

    mythH: 'Now the part nobody tells you',
    mythLede: 'Everything you believe about quantum computing you learned from a YouTube thumbnail. Let us fix that, because reality is far shabbier and far more interesting.',
    mythColA: 'What everyone believes', mythColB: 'What actually happens',
    m1a: '“It is instant, it tries every answer at once.”',
    m1b: 'The <strong>batch</strong> your bit came from waited in line on a real machine. There is a queue of jobs from physicists, universities and companies, and ours got in at the back. Running it takes seconds; the wait in line can be minutes or hours. Nothing about this is instant.',
    m2a: '“It is millions of times faster than a normal computer.”',
    m2b: 'For <strong>almost everything</strong>, it is absurdly slower. It is faster on a handful of very specific problems, and it has not usefully won even on those yet. Your phone does this same coin flip in 0.00001 ms. The IBM machine takes about 30 seconds to run the batch, plus the queue.',
    m3a: '“Qubits are perfect, it is future tech.”',
    m3b: 'They get it wrong <strong>constantly</strong>. A qubit loses its state in microseconds because any vibration, heat or magnetic field knocks it over. That is why the chip lives at 15 millikelvin, colder than outer space. Around 1% of measurements come out wrong for no reason at all.',
    m4a: '“They are about to break all the world’s cryptography.”',
    m4b: 'That would take <strong>millions</strong> of stable qubits with error correction. Today the best chips have between a thousand and a few thousand, and they are noisy. That is years away, maybe decades.',
    m5a: '“Superposition lets you pull out tons of information at once.”',
    m5b: 'It is the opposite: the instant you measure, superposition <strong>ends</strong> and you walk away with a single bit. A qubit in superposition does not hand you two answers, it hands you one and destroys the state on the way out. Literally everything this page uses from quantum mechanics is that one bit.',
    punch1: 'So: we are using the most expensive and coldest computer on the planet, with a line of scientists waiting their turn, to do exactly what a ten peso coin does for free in mid-air.',
    punch2: 'That is the joke. But it is also the one thing on this page that is not a joke: the bit you got is genuinely unpredictable, and a coin cannot promise you that.',
    punch3: 'Also, I take no responsibility if you actually listen to it.',

    adsH: 'So why all the ads?',
    adsLede: 'The answer is awkward but simple: the joke is expensive.',
    f1k: 'What IBM gives away', f1n: 'of quantum machine per month, free. It is generous, and it is all there is.',
    f2k: 'What it costs after that', f2n: 'that is about <strong>$96 dollars a minute</strong>. Not a typo.',
    f3k: 'What one ad brings in', f3n: 'per visit, roughly, with Mexican traffic.',
    adsP1: 'Your flip burns about <strong>2 seconds</strong> of processor. Outside the free quota that is <strong>$3.20 dollars</strong>. An ad earns hundredths of a cent. It would take <strong>around 2,000 visits</strong> to pay for a single flip.',
    adsP2: 'Ads are not going to pay for quantum time. They help with the domain and the server. They are here because the site is free and I ask you for nothing else: no account, no email, not your question.',
    shareH: 'And the 10 minutes are not yours, they are everyone’s',
    shareP1: 'This is the important part. The 10 minutes belong to <strong>one single account</strong>, mine, and they are split across <strong>everyone</strong> who visits. It is not 10 minutes per visitor. Every flip you take is time away from the next person.',
    shareP2: 'Bits come in batches: one big job burns ~30 seconds of machine time and covers ~100 flips, so each flip costs about <strong>0.3 seconds</strong>. That makes the whole month good for around <strong>2,000</strong>. If this ever fills up with people, they can run out before month-end, and the page will tell you: it is gone, come back next month.',
    shareP3: 'Note: IBM has a 180 minutes a year promotion for accounts that already logged 20. If this ever gets there, the limit goes up and I will say so here.',
    repoH: 'All the code is out in the open',
    repoP1: 'So nobody can say it is rigged: the repo is <strong>public</strong>, front end and back end. You can read exactly how the bit is requested, how it is counted and what gets stored. The only thing missing is the IBM keys, which live in a <span class="mono">.env</span> that never gets committed and that the container reads at startup.',
    repoP2: 'If you find me cheating, open an issue and I will put it on the front page.',
    repoLink: 'Front end, back end and the Dockerfile. Read it before you accuse me.',

    fleetH: 'And which machine did you get?',
    fleetLede: 'There is no single quantum computer. IBM runs a fleet, and your flip lands on whichever one is free.',
    fleetP1: 'The bits are not requested one at a time; that would burn the 10 minutes on nothing. The program asks for a <strong>big batch</strong> in one go from whichever machine is <strong>operational</strong> (not in maintenance) and has the <strong>shortest queue</strong> —that is <span class="mono">service.least_busy()</span>—, and stores the answers in a <strong>pool</strong>. Your flip comes out of that pool <strong>instantly</strong>: the minutes-or-hours queue was already served by the batch, you never wait in it. That is why the name changes every so often: it changes when a new batch is pulled, not on every question.',
    fleetP2: 'That is why the results table tells you which machine ran the batch and how long it took: it is not decoration, it is the proof the bits came from real hardware and not a <span class="mono">Math.random()</span>. If the batch landed on one with 60 jobs ahead of it, it was slow: there are real physicists on that same machine, and their experiment probably matters more than your question.',
    fleetP2b: 'And why do we use <strong>a single qubit</strong> when each machine has 156? Because a coin flip is one bit: yes or no. Measuring all 156 would not give a “better” flip, it would give 156 flips at once that nobody asked for. And every extra qubit is one more part that can fail: they are fragile and get it wrong on their own about 1% of the time. The most honest circuit is the smallest one —one qubit, one gate, one measurement— and the other 155 sit still without adding noise.',
    fl1m: 'Heron r2 · 156 qubits', fl1n: 'Almost always the busiest. Some days 60+ jobs deep.',
    fl2m: 'Heron r2 · 156 qubits', fl2n: 'The short-queue one. Our first bits came from here.',
    fl3m: 'Heron r2 · 156 qubits', fl3n: 'The third Heron. Just as good for one bit.',
    fl4m: 'retired · nov 2025', fl4n: 'It was in every tutorial for years. It does not exist anymore, which tells you how young all this is.',
    fleetP3: 'The fleet changes: IBM turns machines on and off every few months. That is why the site never hardcodes a name, it asks which ones exist before pulling each batch.',

    thQubit: 'A measured qubit',
    tr1: 'Where it comes from', tr1a: 'A formula with a seed', tr1b: 'A physical measurement',
    tr2: 'Can it be predicted?', tr2a: 'Yes, if you know the seed', tr2b: 'No. Never. In principle',
    tr3: 'Does it repeat?', tr3a: 'Yes, the sequence is fixed', tr3b: 'There is no sequence',
    tr4: 'How long it takes', tr4b: '~30 s per batch, plus a queue',
    tableNote: 'Yes, it is infinitely slower and more expensive for deciding whether to order tacos. That is the point.',

    srcH: 'Sources',
    srcLede: 'None of this is made up. If you want to go deeper, start here.',
    src1: '3Blue1Brown with MinutePhysics. The best visual explanation of what superposition is and why measuring changes things. <a href="https://www.youtube.com/watch?v=MzRCDLre1b4" target="_blank" rel="noopener">Watch on YouTube</a>.',
    src2: 'Free courses from IBM, starting at zero. The Hadamard gate is properly explained here, with the circuit this page uses.',
    src3t: 'IBM Quantum documentation',
    src3: 'The technical reference: how a job is submitted, what <span class="mono">least_busy</span> is, and which machines exist today.',
    src4t: 'IBM product updates',
    src4: 'Where the fleet data comes from, the retirement of <span class="mono">ibm_brisbane</span> in November 2025, and the open plan minutes.',
    src5: 'In case you wondered why anyone would go to the trouble of hunting for real randomness.',
    credit: 'This page, the design, the copy and the code, I built with <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a>. The machine data in every result comes straight from IBM’s API, not from hand-written text.',
    cta: 'Go flip one',

    cardFleetK: 'The fleet', cardFleetT: '3 open machines',
    cardFleetB: '156 qubits each, chilled to 15 millikelvin, colder than outer space. Your flip lands on whichever has the shortest queue and is not in maintenance.',
    cardFleetL: 'View on IBM Quantum ↗',
    cardFundK: 'The quantum fund',
    cardFundB: 'left of the 10 minutes IBM gives away this month.',
    cardFundB2: 'Ads have bought <strong style="color:var(--color-text);font-weight:500">0 s</strong> extra so far.',
    cardFundL: 'Why all the ads? ↓',
    slotLead970: 'Ad · leaderboard 970×90',
    slot728: 'Ad · 728×90',
    slotResult: 'Ad below result · 728×90',
    slotReward: 'Rewarded ad · 300×250',
    slot300: 'Ad 300×250',
    slot600: 'Ad 300×600',
    slotSticky: 'Anchored ad · 970×60',
    fHome: 'Home', fHow: 'How it works', fLegal: 'Privacy and terms',
    fCredit: 'Built for the joke. Designed with Claude.',
    barWhy: 'why all the ads?'
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

// Medidor de quota: datos reales de /api/quota, no números pintados a mano.
(async () => {
  try {
    const q = await (await fetch('/api/quota')).json();
    const left = q.usage_remaining_seconds, limit = q.usage_limit_seconds;
    if (typeof left !== 'number' || typeof limit !== 'number') return;
    document.getElementById('fundLeft').textContent =
      `${Math.floor(left / 60)} min ${Math.round(left % 60)} s`;
    document.getElementById('fundBar').style.width = (left / limit * 100).toFixed(0) + '%';
  } catch {}   // si falla, queda el '—'
})();
