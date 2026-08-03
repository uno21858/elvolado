/* Flags globales. Cargar antes que app.js / como.js. */
window.VOLADO = {
  /* No prender a mano: correr ads-on.sh, que también arregla legal y AdSense. */
  ADS: false,

  API: '/api/volado',
  DAILY_LIMIT: 5,
  SHOTS: 1000
};

/* Se aplica antes de pintar para que no parpadeen los huecos. */
document.documentElement.dataset.ads = window.VOLADO.ADS ? 'on' : 'off';
