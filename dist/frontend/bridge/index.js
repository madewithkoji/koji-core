"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KojiBridge = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KojiBridge = /*#__PURE__*/function () {
  function KojiBridge() {
    _classCallCheck(this, KojiBridge);
  }

  _createClass(KojiBridge, [{
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
        var messageListener = function messageListener(_ref2) {
          var data = _ref2.data;
          var event = data.event;

          if (event === platformMessageName) {
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
          _feedKey: window.location.hash.replace('#koji-feed-key=', '')
        }, postMessage.data), '*');
      });
    }
  }]);

  return KojiBridge;
}();

exports.KojiBridge = KojiBridge;
//# sourceMappingURL=index.js.map