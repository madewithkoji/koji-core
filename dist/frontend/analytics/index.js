"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analytics = exports.Analytics = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _client = require("../@decorators/client");

var _class;

var Analytics = (_class = /*#__PURE__*/function () {
  function Analytics() {
    (0, _classCallCheck2["default"])(this, Analytics);
  }

  (0, _createClass2["default"])(Analytics, [{
    key: "track",
    value: function track(event, payload) {
      window.parent.postMessage({
        _kojiEventName: '@@koji/analytics/track',
        event: event,
        payload: payload || null
      }, '*');
      return true;
    }
  }]);
  return Analytics;
}(), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "track", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "track"), _class.prototype)), _class);
exports.Analytics = Analytics;
var analytics = new Analytics();
exports.analytics = analytics;
//# sourceMappingURL=index.js.map