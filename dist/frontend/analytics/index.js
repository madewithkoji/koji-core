"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analytics = exports.Analytics = void 0;

var _client = require("../@decorators/client");

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Analytics = (_class = /*#__PURE__*/function () {
  function Analytics() {
    _classCallCheck(this, Analytics);
  }

  _createClass(Analytics, [{
    key: "track",

    /**
     * Just a test
     * @param event Cool event
     * @param payload The payload
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
}(), (_applyDecoratedDescriptor(_class.prototype, "track", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "track"), _class.prototype)), _class);
exports.Analytics = Analytics;
var analytics = new Analytics();
exports.analytics = analytics;
//# sourceMappingURL=index.js.map