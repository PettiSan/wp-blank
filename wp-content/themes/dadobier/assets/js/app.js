// Pages
window.pages = []
require('./pages/home.js')

// Components
window.components = []
require('./components/exemplo.js')

// Modals
// window.modals = [];
// require('./modals/example');

window.app = {
  init: () => {
    window.app.initPages()
    window.app.events()
  },

  initPages: () => {
    const pageAttr = document.querySelector('body').getAttribute('page')
    const page = window.pages[pageAttr]
    if (page) {
      page.init()
    }
  },

  events: () => { },
}
window.app.init()
