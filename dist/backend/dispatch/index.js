"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispatch = exports.PlatformEvents = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _uuid = require("uuid");

var _sockette = _interopRequireDefault(require("sockette"));

var _axios = _interopRequireDefault(require("axios"));

var _base = require("../base");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var unsafeGlobal = global;
unsafeGlobal.WebSocket = require('isomorphic-ws');
var PlatformEvents;
exports.PlatformEvents = PlatformEvents;

(function (PlatformEvents) {
  PlatformEvents["CONNECTED"] = "@@KOJI_DISPATCH/CONNECTED";
  PlatformEvents["CONNECTED_CLIENTS_CHANGED"] = "@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED";
  PlatformEvents["IDENTIFY"] = "@@KOJI_DISPATCH/IDENTIFY";
  PlatformEvents["SET_USER_INFO"] = "@@KOJI_DISPATCH/SET_USER_INFO";
})(PlatformEvents || (exports.PlatformEvents = PlatformEvents = {}));

var Dispatch = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(Dispatch, _Base);

  var _super = _createSuper(Dispatch);

  function Dispatch(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Dispatch);
    _this = _super.call(this, config);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "authToken", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "url", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "initialConnection", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isConnected", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "eventHandlers", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "messageQueue", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ws", null);
    var options = {
      projectId: _this.projectId,
      projectToken: _this.projectToken,
      shardName: config.shardName,
      maxConnectionsPerShard: config.maxConnectionsPerShard || 100,
      authorization: config.authorization
    };
    var params = Object.keys(options).reduce(function (acc, cur) {
      if (options[cur]) {
        acc.push("".concat(cur, "=").concat(encodeURIComponent(options[cur])));
      }

      return acc;
    }, []);
    _this.authToken = config.authorization;
    _this.url = "wss://dispatch.api.gokoji.com?".concat(params.join('&'));
    return _this;
  }

  (0, _createClass2["default"])(Dispatch, [{
    key: "info",
    value: function () {
      var _info = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$axios$get, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].get("https://dispatch-info.api.gokoji.com/info/".concat(this.projectId));

              case 2:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                return _context.abrupt("return", (data || [])[0]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function info() {
        return _info.apply(this, arguments);
      }

      return info;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  if (_this2.ws) {
                    return;
                  } // Create a socket connection to the dispatch server


                  _this2.ws = new _sockette["default"](_this2.url, {
                    timeout: 5e3,
                    maxAttempts: 10,
                    onmessage: function onmessage(e) {
                      return _this2.handleMessage(e, resolve);
                    },
                    onreconnect: function onreconnect() {
                      return _this2.handleReconnect();
                    },
                    onmaximum: function onmaximum() {
                      return _this2.handleMaximum();
                    },
                    onclose: function onclose() {
                      return _this2.handleClose();
                    },
                    onerror: function onerror(e) {
                      return _this2.handleError(e);
                    }
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "handleMessage",
    value: function handleMessage(_ref, resolve) {
      var data = _ref.data;

      var _JSON$parse = JSON.parse(data || '{}'),
          eventName = _JSON$parse.eventName,
          latencyMs = _JSON$parse.latencyMs,
          payload = _JSON$parse.payload;

      if (eventName === PlatformEvents.CONNECTED) {
        this.initialConnection = true;
        this.isConnected = true;
        if (this.authToken) this.identify(this.authToken);
        resolve({
          clientId: payload.clientId,
          shardName: payload.shardName
        });
        return;
      }

      this.eventHandlers.forEach(function (handler) {
        if (eventName === handler.eventName) {
          handler.callback(payload, {
            latencyMs: latencyMs
          });
        }
      });
    }
  }, {
    key: "handleReconnect",
    value: function handleReconnect() {
      var _this3 = this;

      this.isConnected = true;
      this.messageQueue = this.messageQueue.reduce(function (acc, cur) {
        if (_this3.ws) {
          _this3.ws.send(cur);
        }

        return acc;
      }, []);
    }
  }, {
    key: "handleMaximum",
    value: function handleMaximum() {}
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.isConnected = false;
    }
  }, {
    key: "handleError",
    value: function handleError(e) {
      console.error('[Koji Dispatch] error', e);
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      var _this4 = this;

      var handlerId = (0, _uuid.v4)();
      this.eventHandlers.push({
        id: handlerId,
        eventName: eventName,
        callback: callback
      });
      return function () {
        _this4.eventHandlers = _this4.eventHandlers.filter(function (_ref2) {
          var id = _ref2.id;
          return id !== handlerId;
        });
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(userInfo) {
      this.emitEvent(PlatformEvents.SET_USER_INFO, userInfo);
    }
  }, {
    key: "identify",
    value: function identify(authToken) {
      this.emitEvent(PlatformEvents.IDENTIFY, {
        token: authToken
      });
    }
  }, {
    key: "emitEvent",
    value: function emitEvent(eventName, payload, recipients) {
      var message = JSON.stringify({
        eventName: eventName,
        payload: payload,
        recipients: recipients
      }); // Discard a long message

      if (message.length > 128e3) {
        throw new Error('Message is too long to be sent through Koji Dispatch. Messages must be less than 128kb');
      } // Check instantiation


      if (!this.initialConnection || !this.ws) {
        throw new Error('Please make sure you have called and awaited `connect()` before attempting to send a message');
      } // If the connection has dropped, push the message into a queue


      if (!this.isConnected) {
        this.messageQueue.push(message);
        return;
      }

      this.ws.send(message);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.ws) this.ws.close();
      this.ws = null;
    }
  }]);
  return Dispatch;
}(_base.Base);

exports.Dispatch = Dispatch;
//# sourceMappingURL=index.js.map