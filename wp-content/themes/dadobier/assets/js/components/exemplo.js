window.components['exemplo'] = {
  selector: '.exemplo',

  init: () => {
    console.log('Componente exemplo.js Inicializado!');

    window.components['exemplo'].events();
  },

  events: () => {
    console.log('Eventos do Componente exemplo.js Inicializado!');
  },
};
window.components['exemplo'].init();
