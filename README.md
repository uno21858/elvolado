# VOLADO

Pregunta de sí o no, contestada por un qubit medido en hardware cuántico real de IBM.

```
volado/
  index.html    home, medición y resultado
  como.html     "¿Cómo funciona?": los 4 pasos, la flota, mitos
  legal.html    privacidad y términos
  app.js        front: estados, idioma, límite diario, render
  como.js       i18n de como.html
  config.js     flags (API, SHOTS)
  styles.css    design system (tokens, botones, tabla, dialog), no editar a mano
  server.py     backend completo, un archivo
  Dockerfile / docker-compose.yml
```

## Cómo funciona

1. El navegador hace `GET /api/volado`. **La pregunta nunca viaja al servidor** — se queda en el navegador de punta a punta, por eso "no guardamos tu pregunta" es verdad.
2. El server manda **un job nuevo a IBM en ese momento**: `h q[0]; measure q[0];` × 1,000 shots, en la máquina que diga `service.least_busy(operational=True, simulator=False)`. Regresa `{pending: id}` de inmediato y el front hace poll con `/api/volado?job=<id>` hasta que la cola real de IBM lo suelte — la espera de la pantalla es la espera de verdad.
3. Ceros = sí, unos = no, gana la mayoría. El histograma es real, no decorativo. Empate exacto 500/500 (~2.5%): el último tiro decide.
4. La metadata del job (backend, chip, ms de QPU, cola, link) llena la tabla del resultado. El link al job pide cuenta de IBM: los jobs solo los ve su dueño, no hay vista pública.

Con 600 s/mes del plan open y ~3 s de QPU por job de 1,000 shots: ≈ **200 volados/mes**. Por eso `server.py` topa los jobs a 8/día (`MAX_JOBS_DAY`): un bot no puede quemar el mes en una tarde.

> La versión con **pool de bits** (un job de 100k shots que amortiza a ~2,000 volados/mes con respuesta instantánea) vive en la branch `pool`.

## Endpoints

| Ruta | Qué hace |
|---|---|
| `GET /api/volado` | inicia un volado: `{pending: id}` (202) |
| `GET /api/volado?job=<id>` | poll: `{pending, status}` (202) o el resultado `{bit, counts:{zero,one}, job:{…}}` — bit 0 = sí, 1 = no |
| `GET /api/shared` | últimos 20 compartidos `[{q, bit}]` |
| `POST /api/share` | guarda `{q, bit}` (q ≤ 140 chars, máximo 50 guardados) |
| `GET /api/quota` | QPU del mes: consumido / límite / restante |

Todo lo demás sirve los estáticos.

## Correr

```bash
# local
pip install qiskit-ibm-runtime && python3 server.py     # :8000

# docker
docker build -t volado .
docker run -d --name volado --env-file .env -p 8000:8000 \
  -e POOL_FILE=/data/pool.json -v volado-data:/data volado
```

`.env` (nunca al repo): `IBM_API=<API key de IBM Cloud>` y `IBM_CRN=<crn>` (opcional si la cuenta tiene una sola instancia).

Cada volado espera su propia cola de IBM: puede ser de segundos a horas. `pool.json` ya solo guarda el contador de jobs del día; los volados en curso viven en memoria (un restart los pierde y el usuario reintenta).

## Límite diario

5 por día en `localStorage`. Se brinca con incógnito y está bien: es fricción social, no seguridad.
