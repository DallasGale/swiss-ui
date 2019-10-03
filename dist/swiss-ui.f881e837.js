// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"swiss.config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  theme: {
    //  The only color allowed.
    accentColor: '#43aa53',
    // Mode: 'brand, 'negative' or 'positive'
    mode: 'positive',
    // mode: 'negative',
    // mode: 'brand',
    // Font familty
    typography: {
      fontFamily: {
        isHelvetica: true
      }
    }
  }
};
exports.default = _default;
},{}],"src/js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorPicker = void 0;

var _constants = require("./constants");

var colorPicker = function colorPicker(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp; // Check the format of the color, HEX or RGB?

  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  } // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html


  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)); // Using the HSP value, determine whether the color is light or dark

  if (hsp > 200) {
    console.log('light', hsp);
    return _constants.colors.dark;
  } else {
    console.log('dark', hsp);
    return _constants.colors.light;
  }
};

exports.colorPicker = colorPicker;
},{"./constants":"src/js/constants.js"}],"src/js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeTypes = exports.siteTheme = exports.colors = void 0;

var _helpers = require("./helpers");

var _swissConfig = _interopRequireDefault(require("~/swiss.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = {
  dark: '#000000',
  light: '#ffffff'
};
exports.colors = colors;
var siteTheme = {
  accent: _swissConfig.default.theme.accentColor,
  mode: _swissConfig.default.theme.mode
};
exports.siteTheme = siteTheme;
var themeTypes = {
  accent: {
    name: 'accent'
  },
  positive: {
    name: 'positive'
  },
  negative: {
    name: 'negative'
  } // ? Set global style to DOM

};
exports.themeTypes = themeTypes;
var body = document.querySelector('body'); // todo Add to a functions file.

function handleTheme() {
  if (siteTheme.mode === themeTypes.accent.name) {
    return siteTheme.accent;
  } // ...


  if (siteTheme.mode === themeTypes.negative.name) {
    console.log('negative', themeTypes.negative);
    return colors.light;
  } // ...


  if (siteTheme.mode === themeTypes.positive.name) {
    console.log('positive', themeTypes.positive);
    return colors.dark;
  }
} // todo body.style.background = colorPicker(themeChooser(siteTheme.mode))


body.style.background = handleTheme();
body.style.color = (0, _helpers.colorPicker)(body.style.background);
},{"./helpers":"src/js/helpers.js","~/swiss.config.js":"swiss.config.js"}],"src/web-components/buttons/swiss-button.js":[function(require,module,exports) {
"use strict";

var _constants = require("../../js/constants");

var _helpers = require("../../js/helpers");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var accent = _constants.siteTheme.accent;

var SwissButton =
/*#__PURE__*/
function (_HTMLButtonElement) {
  _inherits(SwissButton, _HTMLButtonElement);

  function SwissButton() {
    var _this;

    _classCallCheck(this, SwissButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SwissButton).call(this)); // ? CSS

    var bs = _this.style;

    var buttonType = _this.getAttribute('type'); // todo Add to a functions file.


    function buttonTheme() {
      if (buttonType === _constants.themeTypes.accent.name) {
        console.log('accent', _constants.themeTypes.accent);
        return accent;
      } // ...


      if (buttonType === _constants.themeTypes.negative.name) {
        console.log('negative', _constants.themeTypes.negative);
        return _constants.colors.light;
      } // ...


      if (buttonType === _constants.themeTypes.positive.name) {
        console.log('positive', _constants.themeTypes.positive);
        return _constants.colors.dark;
      }
    } // * Theme


    bs.background = buttonTheme();
    bs.color = (0, _helpers.colorPicker)(bs.background); // * Default

    bs.border = 0;
    bs.boxSizing = 'border-box';
    bs.cursor = 'pointer';
    bs.display = 'inline-block';
    bs.fontSize = '0.8rem';
    bs.fontWeight = 'bold';
    bs.minWidth = '10vw';
    bs.overflow = 'hidden';
    bs.padding = '1.2rem 3rem';
    bs.position = 'relative';
    bs.textTransform = 'uppercase'; // Dropdown content

    _this._hasDropdown = _this.getAttribute('dropdown');
    var icon = document.createElement('span');
    var is = icon.style;
    is.alignItems = 'center';
    is.display = 'flex';
    is.fontSize = '1.2rem';
    is.height = '100%';
    is.justifyContent = 'center';
    is.position = 'absolute';
    is.right = '0.5rem';
    is.transform = 'rotate(180deg)';
    is.top = 0;
    is.width = '2rem';
    icon.innerHTML = '&#9954';

    if (_this._hasDropdown) {
      _this.insertAdjacentElement('beforeend', icon);
    }

    _this.setAttribute('active', false); // ? Event handlers


    var defaultButtonBackground = bs.background;
    var defaultButtonColor = bs.color;
    var activeButtonBackground = bs.color;
    var activeButtonColor = bs.background;

    _this.addEventListener('focus', function () {
      bs.background = activeButtonBackground;
      bs.color = activeButtonColor;

      if (_this._hasDropdown) {
        var iconEl = _this.querySelector('span');

        iconEl.style.transform = 'rotate(0deg)';
        iconEl.style.transition = 'all 0.3s';
      }
    });

    _this.addEventListener('focusout', function () {
      bs.background = defaultButtonBackground;
      bs.color = defaultButtonColor;

      if (_this._hasDropdown) {
        var iconEl = _this.querySelector('span');

        iconEl.style.transform = 'rotate(180deg)';
        iconEl.style.transition = 'all 0.3s';
      }
    });

    _this.addEventListener('mouseover', function () {
      bs.background = activeButtonBackground;
      bs.color = activeButtonColor;

      _this.setAttribute('open', true);

      _this.setAttribute('active', true); // Remove this 'cursor' as a dropdown
      // shouldn't need a clickable parent button


      if (_this._hasDropdown) bs.cursor = 'default';

      if (_this._hasDropdown) {
        var iconEl = _this.querySelector('span');

        iconEl.style.transform = 'rotate(0deg)';
        iconEl.style.transition = 'all 0.3s';
      }
    });

    _this.addEventListener('mouseout', function () {
      bs.background = defaultButtonBackground;
      bs.color = defaultButtonColor;

      _this.setAttribute('open', false);

      _this.setAttribute('active', false);

      if (_this._hasDropdown) {
        var iconEl = _this.querySelector('span');

        iconEl.style.transform = 'rotate(180deg)';
        iconEl.style.transition = 'all 0.3s';
      }
    });

    return _this;
  }

  return SwissButton;
}(_wrapNativeSuper(HTMLButtonElement));

customElements.define('swiss-button', SwissButton, {
  extends: 'button'
});
},{"../../js/constants":"src/js/constants.js","../../js/helpers":"src/js/helpers.js"}],"src/web-components/buttons/nav_dropdown_item.js":[function(require,module,exports) {
"use strict";

var _constants = require("../../js/constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NavDropdownItem =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(NavDropdownItem, _HTMLElement);

  function NavDropdownItem() {
    var _this;

    _classCallCheck(this, NavDropdownItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavDropdownItem).call(this)); // ? Styles

    var bs = _this.style;
    bs.display = 'block';
    bs.position = 'relative';
    bs.fontSize = '0.8rem';
    bs.boxSizing = 'border-box';
    bs.cursor = 'pointer';
    bs.padding = '0.5rem';
    console.log(_this.title);
    _this.textContent = _this.title;

    _this.addEventListener('click', function () {
      console.log(_assertThisInitialized(_this));
    });

    _this.addEventListener('mouseover', function () {
      bs.background = _constants.colors.light;
      bs.color = _constants.colors.dark;
    });

    _this.addEventListener('mouseout', function () {
      bs.background = 'none';
      bs.color = _constants.colors.light;
    });

    return _this;
  }

  return NavDropdownItem;
}(_wrapNativeSuper(HTMLElement));

customElements.define('nav-dropdown-item', NavDropdownItem);
},{"../../js/constants":"src/js/constants.js"}],"src/web-components/buttons/index.js":[function(require,module,exports) {
"use strict";

require("./swiss-button");

require("./nav_dropdown_item");

var section = document.getElementById('buttons');
var elementName = section.id;
section.innerHTML = "\n  <h2 class=\"typography__heading--one\">".concat(elementName, "</h2>\n  <div id='").concat(elementName, "-content'>\n    <button\n      is=\"swiss-button\"\n      type=\"accent\"\n    >\n      Accented\n    </button>\n\n    <button\n      is=\"swiss-button\"\n      type=\"positive\"\n    >\n      Positive\n    </button>\n    \n    <button\n      is=\"swiss-button\"\n      type=\"negative\"\n    >\n      Negative\n    </button>\n    \n  </div>\n  ");
},{"./swiss-button":"src/web-components/buttons/swiss-button.js","./nav_dropdown_item":"src/web-components/buttons/nav_dropdown_item.js"}],"src/web-components/nav-dropdown/index.js":[function(require,module,exports) {
"use strict";

var _constants = require("../../js/constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n\t<style>\n\t\t.dropdown {\n\t\t\tposition: relative;\n\t\t\theight: auto;\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t.content{\n\t\t\tcolor: ".concat(_constants.colors.light, ";\n\t\t\tdisplay: none;\n\t\t\tposition: absolute;\n\t\t\tbackground: ").concat(_constants.colors.dark, ";\n\t\t\tz-index: 1;\n\t\t\twidth: 100%;\n\t\t}\n\n\t\t.dropdown:hover .content { display: block; }\n\t\t.button:focus + .content {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.dropdown:hover .button {\n\t\t\tbackground: ").concat(_constants.colors.light, " !important;\n\t\t\tcolor: ").concat(_constants.colors.dark, " !important;\n\t\t}\n\t</style>\n\t<div class=\"dropdown\">\n\t\t<button is=\"nav-button\" id=\"nav-button\" class=\"button\" dropdown=\"true\"></button>\n\t\t<div class=\"content\">\n\t\t\t<slot name=\"items\"></slot>\n\t\t</div>\n\t</div>\n");

var NavDropdown =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(NavDropdown, _HTMLElement);

  function NavDropdown() {
    var _this;

    _classCallCheck(this, NavDropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavDropdown).call(this));

    _this.setAttribute('open', false);

    var label = template.content.getElementById('nav-button');
    label.textContent = _this.title;

    var shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(template.content.cloneNode(true));
    return _this;
  }

  return NavDropdown;
}(_wrapNativeSuper(HTMLElement));

customElements.define('nav-dropdown', NavDropdown);
},{"../../js/constants":"src/js/constants.js"}],"src/swiss-ui.js":[function(require,module,exports) {
"use strict";

var _swiss = _interopRequireDefault(require("../swiss.config"));

require("./web-components/buttons");

require("./web-components/nav-dropdown");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('🇨🇭swiss-ui here'); // ? Import user settings config and assign them.

var theme = _swiss.default.theme;
var mode = theme.mode,
    typography = theme.typography;
var fontFamily = typography.fontFamily;
var body = document.querySelector('body'); // todo Move to a functions file.

function setFontFamily() {
  if (fontFamily.isHelvetica) return 'helvetica, sans-serif';else 'inherit';
}

body.style.fontFamily = setFontFamily();
body.setAttribute('mode', mode);

if (body.getAttribute('mode') === 'positive') {
  body.style.background;
} // console.log(body)


var main = document.querySelector('main');
var title = document.title;
var heading = "<h1>".concat(title, "</h1>");
main.insertAdjacentHTML('beforebegin', "<h1>".concat(heading, "</h1>")); // Web Components - elements
// import './web-components/site_logo/'
// Buttons
// Header
// Navigation
// Grid
// Side menu
// Typography ... H1 -> H6
// Images
// Lists
// Modals
// Form fields
// Branding
},{"../swiss.config":"swiss.config.js","./web-components/buttons":"src/web-components/buttons/index.js","./web-components/nav-dropdown":"src/web-components/nav-dropdown/index.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56792" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/swiss-ui.js"], null)
//# sourceMappingURL=/swiss-ui.f881e837.js.map