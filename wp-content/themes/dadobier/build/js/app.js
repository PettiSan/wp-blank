/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wp-content/themes/dadobier/assets/css/app.scss":
/*!********************************************************!*\
  !*** ./wp-content/themes/dadobier/assets/css/app.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./wp-content/themes/dadobier/assets/css/app.scss?");

/***/ }),

/***/ "./wp-content/themes/dadobier/assets/js/app.js":
/*!*****************************************************!*\
  !*** ./wp-content/themes/dadobier/assets/js/app.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Pages\nwindow.pages = [];\n\n__webpack_require__(/*! ./pages/home.js */ \"./wp-content/themes/dadobier/assets/js/pages/home.js\"); // Components\n\n\nwindow.components = [];\n\n__webpack_require__(/*! ./components/exemplo.js */ \"./wp-content/themes/dadobier/assets/js/components/exemplo.js\"); // Modals\n// window.modals = [];\n// require('./modals/example');\n\n\nwindow.app = {\n  init: function init() {\n    window.app.initPages();\n    window.app.events();\n  },\n  initPages: function initPages() {\n    var pageAttr = document.querySelector('body').getAttribute('page');\n    var page = window.pages[pageAttr];\n\n    if (page) {\n      page.init();\n    }\n  },\n  events: function events() {}\n};\nwindow.app.init();\n\n//# sourceURL=webpack:///./wp-content/themes/dadobier/assets/js/app.js?");

/***/ }),

/***/ "./wp-content/themes/dadobier/assets/js/components/exemplo.js":
/*!********************************************************************!*\
  !*** ./wp-content/themes/dadobier/assets/js/components/exemplo.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.components['exemplo'] = {\n  selector: '.exemplo',\n  init: function init() {\n    console.log('Componente exemplo.js Inicializado!');\n    window.components['exemplo'].events();\n  },\n  events: function events() {\n    console.log('Eventos do Componente exemplo.js Inicializado!');\n  }\n};\nwindow.components['exemplo'].init();\n\n//# sourceURL=webpack:///./wp-content/themes/dadobier/assets/js/components/exemplo.js?");

/***/ }),

/***/ "./wp-content/themes/dadobier/assets/js/pages/home.js":
/*!************************************************************!*\
  !*** ./wp-content/themes/dadobier/assets/js/pages/home.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.pages['home'] = {\n  selector: '.home',\n  init: function init() {\n    console.log('Página home.js Inicializado!');\n    window.components['home'].events();\n  },\n  events: function events() {\n    console.log('Eventos da Página home.js Inicializado!');\n  }\n};\nwindow.components['home'].init();\n\n//# sourceURL=webpack:///./wp-content/themes/dadobier/assets/js/pages/home.js?");

/***/ }),

/***/ 0:
/*!************************************************************************************************************!*\
  !*** multi ./wp-content/themes/dadobier/assets/js/app.js ./wp-content/themes/dadobier/assets/css/app.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./wp-content/themes/dadobier/assets/js/app.js */\"./wp-content/themes/dadobier/assets/js/app.js\");\nmodule.exports = __webpack_require__(/*! ./wp-content/themes/dadobier/assets/css/app.scss */\"./wp-content/themes/dadobier/assets/css/app.scss\");\n\n\n//# sourceURL=webpack:///multi_./wp-content/themes/dadobier/assets/js/app.js_./wp-content/themes/dadobier/assets/css/app.scss?");

/***/ })

/******/ });