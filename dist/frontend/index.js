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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Koji = /*#__PURE__*/function () {
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

      if (window.parent) {
        window.parent.postMessage({
          _type: 'KojiPreview.Ready'
        }, '*');
      }
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
}();

var _default = new Koji();

exports["default"] = _default;
//# sourceMappingURL=index.js.map