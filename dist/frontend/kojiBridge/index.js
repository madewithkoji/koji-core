"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KojiBridge = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _uuid = require("uuid");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var KojiBridge = /*#__PURE__*/function () {
  function KojiBridge() {
    (0, _classCallCheck2["default"])(this, KojiBridge);
  }

  (0, _createClass2["default"])(KojiBridge, [{
    key: "execCallbackOnMessage",
    value: function execCallbackOnMessage(callback, eventName) {
      var messageListener = function messageListener(_ref) {
        var data = _ref.data;
        var event = data.event;

        if (event === eventName) {
          callback(data);
        }
      };

      window.addEventListener('message', messageListener);
      return function () {
        window.removeEventListener('message', messageListener);
      };
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(postMessage) {
      window.parent.postMessage(_objectSpread({
        _kojiEventName: postMessage.kojiEventName,
        _type: postMessage.kojiEventName,
        _feedKey: window.location.hash.replace('#koji-feed-key=', '')
      }, postMessage.data), '*');
    }
  }, {
    key: "sendMessageAndAwaitResponse",
    value: function sendMessageAndAwaitResponse(postMessage, platformMessageName) {
      return new Promise(function (resolve, reject) {
        var idempotencyKey = (0, _uuid.v4)();
        console.log('called', idempotencyKey);

        var messageListener = function messageListener(_ref2) {
          var data = _ref2.data;
          var event = data.event,
              _idempotencyKey = data._idempotencyKey;

          if (event === platformMessageName && idempotencyKey === _idempotencyKey) {
            try {
              resolve(data);
            } catch (err) {
              reject(err);
            }

            window.removeEventListener('message', messageListener);
          }
        };

        window.addEventListener('message', messageListener);
        window.parent.postMessage(_objectSpread({
          _kojiEventName: postMessage.kojiEventName,
          _type: postMessage.kojiEventName,
          _feedKey: window.location.hash.replace('#koji-feed-key=', ''),
          _idempotencyKey: idempotencyKey
        }, postMessage.data), '*');
      });
    }
  }]);
  return KojiBridge;
}();

exports.KojiBridge = KojiBridge;
//# sourceMappingURL=index.js.map