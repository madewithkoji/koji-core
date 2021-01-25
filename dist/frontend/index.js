"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Koji = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _analytics = require("./analytics");

var _iap = require("./iap");

var _identity = require("./identity");

var _playerState = require("./playerState");

var _remix = require("./remix");

var _ui = require("./ui");

var _client = require("./@decorators/client");

var _equalsIgnoreOrder = require("../utils/equalsIgnoreOrder");

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Koji = (_class = (_temp = /*#__PURE__*/function () {
  function Koji() {
    (0, _classCallCheck2["default"])(this, Koji);
    (0, _defineProperty2["default"])(this, "isReady", void 0);
    (0, _defineProperty2["default"])(this, "configInitialized", false);
    (0, _defineProperty2["default"])(this, "services", {});
    (0, _defineProperty2["default"])(this, "analytics", _analytics.analytics);
    (0, _defineProperty2["default"])(this, "iap", _iap.iap);
    (0, _defineProperty2["default"])(this, "identity", _identity.identity);
    (0, _defineProperty2["default"])(this, "playerState", _playerState.playerState);
    (0, _defineProperty2["default"])(this, "remix", _remix.remix);
    (0, _defineProperty2["default"])(this, "ui", _ui.ui);
    this.isReady = false;
  }
  /**
   * Prepare this package for use by passing in the data from your koji.json
   * file. In addition to setting up things like your serviceMap and remix values,
   * this function will also do some basic structural checks.
   * @param {Object} kojiConfig Your Koji configuration object (e.g., require('./koji.json'))
   * @param {Object} kojiConfig.develop Instructions to set up the development/editor environment for your services
   * @param {Object} kojiConfig.deploy Instructions to deploy your services to production
   * @param {Object} kojiConfig.remixData The base values for your customizable remix data
   * @param {Object} kojiConfig.['@@initialTransform'] The values that will be loaded for new remixes
   */


  (0, _createClass2["default"])(Koji, [{
    key: "config",
    value: function config() {
      var kojiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var kojiConfigOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        services: {}
      };

      if (this.configInitialized) {
        console.warn('You are trying to run config more than one time. The previous configuration options will not be overwritten but this could indicate unexpected behavior in your project.');
        return;
      }

      var _kojiConfig$develop = kojiConfig.develop,
          develop = _kojiConfig$develop === void 0 ? {} : _kojiConfig$develop,
          _kojiConfig$deploy = kojiConfig.deploy,
          deploy = _kojiConfig$deploy === void 0 ? {} : _kojiConfig$deploy,
          _kojiConfig$remixData = kojiConfig.remixData,
          remixData = _kojiConfig$remixData === void 0 ? {} : _kojiConfig$remixData;
      var developServices = Object.keys(develop);
      var deployServices = Object.keys(deploy); // Require at least one deploy service to be defined

      if (deployServices.length === 0) throw new Error('Your configuration does not include any services for'); // Require at least one develop service to be defined

      if (developServices.length === 0) throw new Error('Your configuration does not include any services for development'); // Require the develop and deploy services to match

      if (!(0, _equalsIgnoreOrder.equalsIgnoreOrder)(deployServices, developServices)) throw new Error('Your develop and deploy services do not match'); // Create the base service map and look for env vars we know to exist

      var baseServiceMap = {};
      deployServices.forEach(function (serviceName) {
        baseServiceMap[serviceName] = process.env["KOJI_SERVICE_URL_".concat(serviceName)];
      }); // If the user has explicitly passed in values, use those instead

      Object.keys(kojiConfigOptions.services).forEach(function (serviceName) {
        if (kojiConfigOptions.services[serviceName]) {
          baseServiceMap[serviceName] = kojiConfigOptions.services[serviceName];
        }
      }); // Require a value for each service

      Object.keys(baseServiceMap).forEach(function (serviceName) {
        if (!baseServiceMap[serviceName]) throw new Error("Unable to find a value for the ".concat(serviceName, " service. If your value is not available at `process.env.KOJI_SERVICE_URL_").concat(serviceName, "`, you may need to pass it explicitly using the second, kojiConfigOptions parameter when calling Koji.config"));
      }); // Handle overrides

      if (window.KOJI_OVERRIDES) {
        var _window$KOJI_OVERRIDE = window.KOJI_OVERRIDES.overrides,
            overrides = _window$KOJI_OVERRIDE === void 0 ? {} : _window$KOJI_OVERRIDE;

        if (overrides && overrides.serviceMap) {
          this.services = _objectSpread(_objectSpread({}, baseServiceMap), overrides.serviceMap);
        }
      } else {
        this.services = _objectSpread({}, baseServiceMap);
      } // Initialize remix data


      this.remix.init(remixData);
    }
  }, {
    key: "ready",
    value: function ready() {
      this.isReady = true; // Add a listener to pass click events up to the parent window,
      // as there is no way for the platform to know these clicks are
      // happening due to iframe constraints

      window.addEventListener('click', function (e) {
        try {
          var clientX = e.clientX,
              clientY = e.clientY;
          window.parent.postMessage({
            _type: 'Koji.ClickEvent',
            _feedKey: window.location.hash.replace('#koji-feed-key=', ''),
            x: clientX,
            y: clientY
          }, '*');
        } catch (err) {//
        }
      }, {
        capture: true,
        passive: true
      }); // Send the ready message, letting the platform know it's okay
      // to release any queued messages

      window.parent.postMessage({
        _type: 'KojiPreview.Ready'
      }, '*');
    }
  }]);
  return Koji;
}(), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "ready", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "ready"), _class.prototype)), _class);
exports.Koji = Koji;

var _default = new Koji();

exports["default"] = _default;
//# sourceMappingURL=index.js.map