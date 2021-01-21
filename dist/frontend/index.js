"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _analytics = require("./analytics");

var _iap = require("./iap");

var _identity = require("./identity");

var _remix = require("./remix");

var _ui = require("./ui");

var _client = require("./@decorators/client");

var _class, _temp;

var Koji = (_class = (_temp = /*#__PURE__*/function () {
  function Koji() {
    (0, _classCallCheck2["default"])(this, Koji);
    (0, _defineProperty2["default"])(this, "projectId", void 0);
    (0, _defineProperty2["default"])(this, "projectToken", void 0);
    (0, _defineProperty2["default"])(this, "isReady", void 0);
    (0, _defineProperty2["default"])(this, "analytics", _analytics.analytics);
    (0, _defineProperty2["default"])(this, "iap", _iap.iap);
    (0, _defineProperty2["default"])(this, "identity", _identity.identity);
    (0, _defineProperty2["default"])(this, "remix", _remix.remix);
    (0, _defineProperty2["default"])(this, "ui", _ui.ui);
    this.isReady = false;
    this.projectId = process.env.KOJI_PROJECT_ID;
    this.projectToken = process.env.KOJI_PROJECT_TOKEN;
  }

  (0, _createClass2["default"])(Koji, [{
    key: "ready",
    value: function ready() {
      this.isReady = true;
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
      });
      window.parent.postMessage({
        _type: 'KojiPreview.Ready'
      }, '*');
    }
  }, {
    key: "setProjectValues",
    value: function setProjectValues(id, token) {
      this.projectId = id;
      this.projectToken = token;
    }
  }, {
    key: "getProjectValues",
    value: function getProjectValues() {
      return {
        projectId: this.projectId,
        projectToken: this.projectToken
      };
    }
  }]);
  return Koji;
}(), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "ready", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "ready"), _class.prototype)), _class);

var _default = new Koji();

exports["default"] = _default;
//# sourceMappingURL=index.js.map