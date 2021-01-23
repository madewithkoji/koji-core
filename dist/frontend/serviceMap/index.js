"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceMap = exports.ServiceMap = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ServiceMap = /*#__PURE__*/function () {
  function ServiceMap() {
    (0, _classCallCheck2["default"])(this, ServiceMap);
  }

  (0, _createClass2["default"])(ServiceMap, [{
    key: "get",
    value: function get() {
      var envMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var services = Object.keys(envMap);
      console.log('s', services, envMap);
      if (!services || services.length === 0) throw new Error('Please add some base services'); // Handle overrides

      if (window.KOJI_OVERRIDES) {
        var _window$KOJI_OVERRIDE = window.KOJI_OVERRIDES.overrides,
            overrides = _window$KOJI_OVERRIDE === void 0 ? {} : _window$KOJI_OVERRIDE;

        if (overrides && overrides.serviceMap) {
          return _objectSpread(_objectSpread({}, envMap), overrides.serviceMap);
        }
      } // If no overrides, return the original map


      return _objectSpread({}, envMap);
    }
  }]);
  return ServiceMap;
}();

exports.ServiceMap = ServiceMap;
var serviceMap = new ServiceMap();
exports.serviceMap = serviceMap;
//# sourceMappingURL=index.js.map