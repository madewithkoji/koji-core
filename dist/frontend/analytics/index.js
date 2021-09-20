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

/**
 * Enables you to track custom events in your Koji apps.
 * For example, track `onClick` events for the links and buttons in a Koji app.
 *
 * To view the analytics data for a published Koji app, view the published app, click the **App** link, and then **Open Analytics**.
 * You will see data for the custom events along with a standard set of built-in metrics, which are calculated from the app’s access logs.
 *
 * TIP: Analytics data is processed at frequent intervals throughout the day. If you are testing the custom events in a published app and you don’t see results at first, wait 10 minutes to account for data processing latency, and then check again.
 */
var Analytics = (_class = /*#__PURE__*/function () {
  function Analytics() {
    (0, _classCallCheck2["default"])(this, Analytics);
  }

  (0, _createClass2["default"])(Analytics, [{
    key: "track",

    /**
     * Generates an analytics event with the specified name and data payload, if applicable.
     *
     * @param  event   Name of the custom event.
     * @param  payload List of custom key-value pairs to save with the event.
     * @return         Indicates whether the event was generated.
     *
     * @example
     *
     * ```javascript
     * const event = Koji.analytics.track('My Custom Event');
     *
     * // with optional payload
     * const event = Koji.analytics.track('Won game', { score: 120 });
     * ```
     */
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