"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _analytics = require("./analytics");

var _iap = require("./iap");

var _identity = require("./identity");

var _remix = require("./remix");

var _ui = require("./ui");

var _client = require("./@decorators/client");

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Koji = (_class = (_temp = /*#__PURE__*/function () {
  function Koji() {
    _classCallCheck(this, Koji);

    _defineProperty(this, "projectId", void 0);

    _defineProperty(this, "projectToken", void 0);

    _defineProperty(this, "isReady", void 0);

    _defineProperty(this, "analytics", _analytics.analytics);

    _defineProperty(this, "iap", _iap.iap);

    _defineProperty(this, "identity", _identity.identity);

    _defineProperty(this, "remix", _remix.remix);

    _defineProperty(this, "ui", _ui.ui);

    this.isReady = false;
    this.projectId = process.env.KOJI_PROJECT_ID;
    this.projectToken = process.env.KOJI_PROJECT_TOKEN;
  }

  _createClass(Koji, [{
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
}(), _temp), (_applyDecoratedDescriptor(_class.prototype, "ready", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "ready"), _class.prototype)), _class);

var _default = new Koji();

exports["default"] = _default;
//# sourceMappingURL=index.js.map