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
})({"src/router/Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router =
/*#__PURE__*/
function () {
  function Router() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var renderNode = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Router);

    this.routes = routes;
    this.renderNode = renderNode;
    this.navigation(location.pathname + location.hash);
  }

  _createClass(Router, [{
    key: "addRoutes",
    value: function addRoutes(routes) {
      this.routes = [].concat(_toConsumableArray(this.routes), _toConsumableArray(routes));
    }
  }, {
    key: "match",
    value: function match(route, requestPath) {
      var paramNames = [];
      var regexPath = route.path.replace(/([:*])(\w+)/g, function (full, colon, name) {
        paramNames.push(name);
        return '([^\/]+)';
      }) + '(?:\/|$)';
      var params = {};
      var routeMatch = requestPath.match(new RegExp(regexPath));

      if (routeMatch !== null) {
        params = routeMatch.slice(1).reduce(function (params, value, index) {
          if (params === null) params = {};
          params[paramNames[index]] = value;
          return params;
        }, null);
      }

      route.setProps(params);
      return routeMatch;
    }
  }, {
    key: "navigation",
    value: function navigation(path) {
      var _this = this;

      var route = this.routes.filter(function (route) {
        return _this.match(route, path);
      })[0];
      if (!route) this.renderNode.innerHTML = '404! Page not found';else {
        // console.log(path)
        window.location.href = path.search('/#') === -1 ? '#' + path : path;
        this.renderNode.innerHTML = route.renderView(); // innerHTML must be avoided
      }
    }
  }]);

  return Router;
}();

exports.default = Router;
},{}],"src/router/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(routes) {
  var router = new _Router.default(routes, document.getElementById('app')); // console.log(router.navigation)

  document.addEventListener('DOMContentLoaded', function (e) {
    document.querySelectorAll('[route]').forEach(function (route) {
      return route.addEventListener('click', function (e) {
        e.preventDefault(); // console.log(router.navigation)

        router.navigation(e.target.getAttribute('route'));
      }, false);
    });
  });
  window.addEventListener('hashchange', function (e) {
    router.navigation(e.target.location.hash.substr(1));
  });
};

exports.default = _default;
},{"./Router":"src/router/Router.js"}],"src/router/Route.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Route =
/*#__PURE__*/
function () {
  function Route(name, path, view) {
    _classCallCheck(this, Route);

    this.name = name;
    this.path = path;
    this.view = view;
  }

  _createClass(Route, [{
    key: "setProps",
    value: function setProps(newProps) {
      this.props = newProps;
    }
  }, {
    key: "renderView",
    value: function renderView() {
      return this.view(this.props);
    }
  }]);

  return Route;
}();

exports.default = Route;
},{}],"src/js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPicker = void 0;

var _constants = require("./constants");

var ColorPicker = function ColorPicker(color) {
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
    return _constants.SiteTheme.shadow;
  } else {
    console.log('dark', hsp);
    return _constants.SiteTheme.highlight;
  }
}; // export const HandleButtonBorder = (color, theme) => {
// 	if (ColorPicker(color) == '#fff') {
// 		console.log(color)
// 		return '1px solid black'
// 	} else {
// 		return 'none'
// 	}
// }


exports.ColorPicker = ColorPicker;
},{"./constants":"src/js/constants.js"}],"src/js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SiteTheme = void 0;

var _helpers = require("./helpers");

var theme = window.theme;
var SiteTheme = {
  primary: theme.primary,
  secondary: theme.secondary,
  highlight: theme.highlight,
  shadow: theme.shadow
};
exports.SiteTheme = SiteTheme;
var body = document.querySelector('body');
body.style.background = (0, _helpers.ColorPicker)(SiteTheme.primary);
body.style.color = (0, _helpers.ColorPicker)(body.style.background);
var _default = SiteTheme;
exports.default = _default;
},{"./helpers":"src/js/helpers.js"}],"src/web-components/site_logo/index.js":[function(require,module,exports) {
"use strict";

var _constants = _interopRequireDefault(require("../../js/constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
template.innerHTML = "\n\t<style>\n\t\t.logo {\n\t\t\twidth: auto;\n\t\t\tdisplay: inline-block;\n\t\t\tpadding: 0.8rem 0;\n\t\t\tfont-weight: bold;\n\t\t\tfont-size: 1.2rem;\n\t\t}\n\t\t.dev {\n\t\t\tcolor: ".concat(_constants.default.red, ";\n\t\t}\n\t</style>\n\t<div id=\"logo\" class=\"logo\">\n\t\t<span class=\"name\">DallasGale</span>\n\t\t<span class=\"dev\">.dev</span>\n\t</div>\n");

var SiteLogo =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SiteLogo, _HTMLElement);

  function SiteLogo() {
    var _this;

    _classCallCheck(this, SiteLogo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SiteLogo).call(this));

    var shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(template.content.cloneNode(true));
    return _this;
  }

  return SiteLogo;
}(_wrapNativeSuper(HTMLElement));

customElements.define('site-logo', SiteLogo);
},{"../../js/constants":"src/js/constants.js"}],"src/web-components/buttons/nav_button.js":[function(require,module,exports) {
"use strict";

var _constants = _interopRequireDefault(require("../../js/constants"));

var _helpers = require("../../js/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var primary = _constants.default.primary;

var NavButton =
/*#__PURE__*/
function (_HTMLButtonElement) {
  _inherits(NavButton, _HTMLButtonElement);

  function NavButton() {
    var _this;

    _classCallCheck(this, NavButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavButton).call(this)); // ? CSS

    var bs = _this.style; // * Theme

    bs.background = primary;
    bs.color = (0, _helpers.ColorPicker)(bs.background); // * Default

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

  return NavButton;
}(_wrapNativeSuper(HTMLButtonElement));

customElements.define('nav-button', NavButton, {
  extends: 'button'
});
},{"../../js/constants":"src/js/constants.js","../../js/helpers":"src/js/helpers.js"}],"src/web-components/buttons/nav_dropdown_item.js":[function(require,module,exports) {
"use strict";

var _constants = _interopRequireDefault(require("../../js/constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      bs.background = _constants.default.white;
      bs.color = _constants.default.black;
    });

    _this.addEventListener('mouseout', function () {
      bs.background = 'none';
      bs.color = _constants.default.white;
    });

    return _this;
  }

  return NavDropdownItem;
}(_wrapNativeSuper(HTMLElement));

customElements.define('nav-dropdown-item', NavDropdownItem);
},{"../../js/constants":"src/js/constants.js"}],"src/web-components/nav-dropdown/index.js":[function(require,module,exports) {
"use strict";

var _constants = _interopRequireDefault(require("../../js/constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
template.innerHTML = "\n\t<style>\n\t\t.dropdown {\n\t\t\tposition: relative;\n\t\t\theight: auto;\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t.content{\n\t\t\tcolor: ".concat(_constants.default.white, ";\n\t\t\tdisplay: none;\n\t\t\tposition: absolute;\n\t\t\tbackground: ").concat(_constants.default.black, ";\n\t\t\tz-index: 1;\n\t\t\twidth: 100%;\n\t\t}\n\n\t\t.dropdown:hover .content { display: block; }\n\t\t.button:focus + .content {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.dropdown:hover .button {\n\t\t\tbackground: ").concat(_constants.default.white, " !important;\n\t\t\tcolor: ").concat(_constants.default.black, " !important;\n\t\t}\n\t</style>\n\t<div class=\"dropdown\">\n\t\t<button is=\"nav-button\" id=\"nav-button\" class=\"button\" dropdown=\"true\"></button>\n\t\t<div class=\"content\">\n\t\t\t<slot name=\"items\"></slot>\n\t\t</div>\n\t</div>\n");

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
},{"../../js/constants":"src/js/constants.js"}],"src/js/web_animations.js":[function(require,module,exports) {
// Wave animatiom
var wave = document.getElementById('wave');

if (wave) {
  wave.animate([{
    backgroundPosition: '0, 0'
  }, {
    backgroundPosition: '-9679px, 0'
  }], {
    duration: 15000,
    iterations: Infinity
  });
}

var wave2 = document.getElementById('wave-2');

if (wave2) {
  wave2.animate([{
    backgroundPosition: '0, 0'
  }, {
    backgroundPosition: '-6000px, 0'
  }], {
    duration: 25000,
    iterations: Infinity
  });
}
},{}],"src/views/home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var HomeView = function HomeView() {
  return "\n<section class=\"page\">\n  <h1>Home</h1>\n</section>\n";
};

var _default = HomeView;
exports.default = _default;
},{}],"src/views/about.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var AboutView = function AboutView() {
  return "\n  <section class=\"page\">\n    <h1>About</h1>\n  </section>\n";
};

var _default = AboutView;
exports.default = _default;
},{}],"src/views/contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ContactView = function ContactView() {
  return "\n<section class=\"page\">\n  <h1>Contact</h1>\n</section>\n";
};

var _default = ContactView;
exports.default = _default;
},{}],"src/views/portfolio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Portfolio = function Portfolio() {
  return "\n  <section class=\"page\">\n    <h1>Portfolio</h1>\n  </section>\n";
};

console.log(void 0);
var _default = Portfolio;
exports.default = _default;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./src/router/index"));

var _Route = _interopRequireDefault(require("./src/router/Route"));

require("./src/web-components/site_logo/");

require("./src/web-components/buttons/nav_button");

require("./src/web-components/buttons/nav_dropdown_item");

require("./src/web-components/nav-dropdown");

require("./src/js/web_animations");

var _home = _interopRequireDefault(require("./src/views/home"));

var _about = _interopRequireDefault(require("./src/views/about"));

var _contact = _interopRequireDefault(require("./src/views/contact"));

var _portfolio = _interopRequireDefault(require("./src/views/portfolio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes
// Web Components - elements
// Web Animations
// Templates
// Views
var routes = [new _Route.default('home', '/', _home.default), new _Route.default('about', '/about', _about.default), new _Route.default('contact', '/contact', _contact.default), new _Route.default('contact', '/portfolio', _portfolio.default)];
(0, _index.default)(routes);
},{"./src/router/index":"src/router/index.js","./src/router/Route":"src/router/Route.js","./src/web-components/site_logo/":"src/web-components/site_logo/index.js","./src/web-components/buttons/nav_button":"src/web-components/buttons/nav_button.js","./src/web-components/buttons/nav_dropdown_item":"src/web-components/buttons/nav_dropdown_item.js","./src/web-components/nav-dropdown":"src/web-components/nav-dropdown/index.js","./src/js/web_animations":"src/js/web_animations.js","./src/views/home":"src/views/home.js","./src/views/about":"src/views/about.js","./src/views/contact":"src/views/contact.js","./src/views/portfolio":"src/views/portfolio.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51860" + '/');

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
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map