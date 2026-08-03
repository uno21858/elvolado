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
2. `server.py` mantiene un **pool de bits** (`pool.json`). Si se agota, pide UN job de 100,000 shots a IBM: `h q[0]; measure q[0];` en la máquina que diga `service.least_busy(operational=True, simulator=False)`. Un job de 100k shots cuesta el mismo QPU (~30 s) que uno chico y da bits pa 100 volados.
3. Cada volado consume 1,000 bits del pool: ceros = sí, unos = no. El histograma es real, no decorativo, y ningún bit se reusa.
4. Empate exacto 500/500 (probabilidad ~2.5%, 1 de cada 40): un bit extra del pool desempata y la página lo dice tal cual.
5. La metadata del job (backend, chip, ms de QPU, cola, link) se guarda con el lote y llena la tabla del resultado. El link al job pide cuenta de IBM: los jobs solo los ve su dueño, no hay vista pública.

Con 600 s/mes del plan open y ~30 s por refill de 100k shots: ~20 refills ≈ **2,000 volados/mes** (100 por refill). Por eso `server.py` topa los refills a 3/día (`MAX_REFILLS_DAY`): un bot no puede quemar el mes en minutos.

## Endpoints

| Ruta | Qué hace |
|---|---|
| `GET /api/volado` | un volado: `{bit, counts:{zero,one}, job:{…}}` — bit 0 = sí, 1 = no |
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

El primer volado (y uno de cada 100) tarda lo que tarde la cola de IBM; el resto sale del pool al instante. Perder `pool.json` solo cuesta un refill.

## Límite diario

5 por día en `localStorage`. Se brinca con incógnito y está bien: es fricción social, no seguridad.
