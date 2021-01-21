"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispatch = exports.PlatformEvents = void 0;

var _uuid = require("uuid");

var _sockette = _interopRequireDefault(require("sockette"));

var _axios = _interopRequireDefault(require("axios"));

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inherits(Dispatch, _Base);

  var _super = _createSuper(Dispatch);

  function Dispatch(config) {
    var _this;

    _classCallCheck(this, Dispatch);

    _this = _super.call(this, config);

    _defineProperty(_assertThisInitialized(_this), "authToken", void 0);

    _defineProperty(_assertThisInitialized(_this), "url", void 0);

    _defineProperty(_assertThisInitialized(_this), "initialConnection", false);

    _defineProperty(_assertThisInitialized(_this), "isConnected", false);

    _defineProperty(_assertThisInitialized(_this), "eventHandlers", []);

    _defineProperty(_assertThisInitialized(_this), "messageQueue", []);

    _defineProperty(_assertThisInitialized(_this), "ws", null);

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

  _createClass(Dispatch, [{
    key: "info",
    value: function () {
      var _info = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$axios$get, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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