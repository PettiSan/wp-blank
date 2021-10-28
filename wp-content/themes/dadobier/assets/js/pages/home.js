window.pages['home'] = {
  selector: '.home',

  init: () => {
    console.log('Página home.js Inicializado!');

    window.components['home'].events();
  },

  events: () => {
    console.log('Eventos da Página home.js Inicializado!');
  },
};
window.components['home'].init();
