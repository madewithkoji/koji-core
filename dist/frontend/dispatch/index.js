"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = exports.Dispatch = exports.PlatformEvents = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _uuid = require("uuid");

var _sockette = _interopRequireDefault(require("sockette"));

var _axios = _interopRequireDefault(require("axios"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var unsafeGlobal = global;
unsafeGlobal.WebSocket = require('isomorphic-ws');
/**
 * Configuration options for a new connection.
 */

/**
 * Defines constants for Koji platform events.
 */
var PlatformEvents;
/**
 * Defines a MessageHandler interface.
 */

exports.PlatformEvents = PlatformEvents;

(function (PlatformEvents) {
  PlatformEvents["CONNECTED"] = "@@KOJI_DISPATCH/CONNECTED";
  PlatformEvents["CONNECTED_CLIENTS_CHANGED"] = "@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED";
  PlatformEvents["IDENTIFY"] = "@@KOJI_DISPATCH/IDENTIFY";
  PlatformEvents["SET_USER_INFO"] = "@@KOJI_DISPATCH/SET_USER_INFO";
})(PlatformEvents || (exports.PlatformEvents = PlatformEvents = {}));

/**
 * Implements a dispatch system for real-time communication on the frontend of your Koji app.
 */
var Dispatch = /*#__PURE__*/function () {
  function Dispatch() {
    (0, _classCallCheck2["default"])(this, Dispatch);
    (0, _defineProperty2["default"])(this, "authToken", void 0);
    (0, _defineProperty2["default"])(this, "projectId", void 0);
    (0, _defineProperty2["default"])(this, "initialConnection", false);
    (0, _defineProperty2["default"])(this, "isConnected", false);
    (0, _defineProperty2["default"])(this, "eventHandlers", []);
    (0, _defineProperty2["default"])(this, "messageQueue", []);
    (0, _defineProperty2["default"])(this, "ws", null);
  }

  (0, _createClass2["default"])(Dispatch, [{
    key: "info",

    /**
     * Gets information about the active dispatch shards.
     *
     * @return    Array of objects containing information about the dispatch shards.
     *
     * @example
     * ```javascript
     * const shardInfo = await Koji.dispatch.info();
     * ```
     */
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
    /**
     * Sets the project ID for the dispatch service.
     *
     * @param     projectId     Unique identifier for the Koji project.
     *
     * @example
     * ```javascript
     * Koji.dispatch.setProjectId(myProject);
     * ```
     */

  }, {
    key: "setProjectId",
    value: function setProjectId(projectId) {
      this.projectId = projectId;
    }
    /**
     * Connects a client to a dispatch shard.
     *
     * @param     config    Configuration options for the connection.
     *
     * @return              Connection details, including the client ID and shard name.
      *
     * @example
     * ```javascript
     * const myInfo = await Koji.dispatch.connect({
     *  maxConnectionsPerShard: '25',
     *  authorization: token
     * });
     * ```
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;

        var config,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                return _context2.abrupt("return", new Promise(function (resolve) {
                  if (_this.ws) {
                    return;
                  }

                  var options = {
                    projectId: _this.projectId,
                    shardName: config.shardName,
                    maxConnectionsPerShard: config.maxConnectionsPerShard || 100
                  };
                  var params = Object.keys(options).reduce(function (acc, cur) {
                    if (options[cur]) {
                      acc.push("".concat(cur, "=").concat(encodeURIComponent(options[cur])));
                    }

                    return acc;
                  }, []);
                  var url = "wss://dispatch.api.gokoji.com?".concat(params.join('&'));
                  _this.authToken = config.authorization; // Create a socket connection to the dispatch server

                  _this.ws = new _sockette["default"](url, {
                    timeout: 5e3,
                    maxAttempts: 10,
                    onmessage: function onmessage(e) {
                      return _this.handleMessage(e, resolve);
                    },
                    onreconnect: function onreconnect() {
                      return _this.handleReconnect();
                    },
                    onmaximum: function onmaximum() {
                      return _this.handleMaximum();
                    },
                    onclose: function onclose(e) {
                      return _this.handleClose(e);
                    },
                    onerror: function onerror(e) {
                      return _this.handleError(e);
                    }
                  });
                }));

              case 2:
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
    /**
     * Handles a message event.
     *
     * @param     data        JSON object containing eventName, latencyMS, and payload.
     * @param     eventName   PlatformEvents enum value
     * @param     latencyMS   Latency in milliseconds
     * @param     payload     Client object
     *
     * @example
     * ```javascript
     * dispatch.handleMessage(PlatformEvents.CONNECTED, 1000, client);
     * ```
     */

  }, {
    key: "handleMessage",
    value: function handleMessage(_ref, resolve) {
      var data = _ref.data;

      var _JSON$parse = JSON.parse(data || '{}'),
          eventName = _JSON$parse.eventName,
          latencyMs = _JSON$parse.latencyMs,
          payload = _JSON$parse.payload; // On an explicit connection event, we update the local state
      // and short-circuit to prevent it from passing to registered
      // event handlers.


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
    /**
     * Reconnects a shard.
     *
     * @example
     * ```javascript
     * dispatch.handleReconnect();
     * ```
     */

  }, {
    key: "handleReconnect",
    value: function handleReconnect() {
      var _this2 = this;

      console.log('reconnect');
      this.isConnected = true;
      this.messageQueue = this.messageQueue.reduce(function (acc, cur) {
        if (_this2.ws) {
          _this2.ws.send(cur);
        }

        return acc;
      }, []);
    }
    /**
     * Handles maximum.
     *
     * @example
     * ```javascript
     * dispatch.handleMaximum();
     * ```
     */

  }, {
    key: "handleMaximum",
    value: function handleMaximum() {}
    /**
     * Cleans up when connection is closed.
     *
     * @example
     * ```javascript
     * dispatch.handleClose();
     * ```
     */

  }, {
    key: "handleClose",
    value: function handleClose(e) {
      console.log('close', e);
      this.isConnected = false;
    }
    /**
     * Prints error message to console.
     *
     * @param     e    Event that generated the error.
     *
     * @example
     * ```javascript
     * dispatch.handleError(e);
     * ```
     */

  }, {
    key: "handleError",
    value: function handleError(e) {
      console.error('[Koji Dispatch] error', e);
    }
    /**
     * Sets a listener for a specific event, and invokes a callback function when the event is dispatched over the shard.
     *
     * @param     eventName     Name of the event to subscribe to.
     * @param     callback      Function to invoke when the event is fired.
     *
     * @return                  Function to unsubscribe from the event listener.
     *
     * @example
     * ```javascript
     * unsubscribeEvent = Koji.dispatch.on('eventName', callbackFunction);
     * ```
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      var _this3 = this;

      var handlerId = (0, _uuid.v4)();
      this.eventHandlers.push({
        id: handlerId,
        eventName: eventName,
        callback: callback
      });
      return function () {
        _this3.eventHandlers = _this3.eventHandlers.filter(function (_ref2) {
          var id = _ref2.id;
          return id !== handlerId;
        });
      };
    }
    /**
     * Sets a listener for changes to connected clients, and invokes a callback function when the event is dispatched over the shard.
     * A change occurs whenever any client connects, disconnects, or updates their user information with [[setUserInfo]].
     *
     * @param     callback      Function to invoke when the event is fired.
     *
     * @return                  Function to unsubscribe from the event listener.
     *
     * @example
     * ```javascript
     * unsubscribeEvent = Koji.dispatch.onConnectedClientsChanged(callbackFunction);
     * ```
     */

  }, {
    key: "onConnectedClientsChanged",
    value: function onConnectedClientsChanged(_callback) {
      var _this4 = this;

      var handlerId = (0, _uuid.v4)(); // Map the object of connected clients to an array, keyed by clientId

      function mapConnectedClients(connectedClientsObj) {
        return Object.keys(connectedClientsObj).map(function (key) {
          return _objectSpread({
            clientId: key
          }, [connectedClientsObj[key]][0]);
        });
      }

      this.eventHandlers.push({
        id: handlerId,
        eventName: PlatformEvents.CONNECTED_CLIENTS_CHANGED,
        callback: function callback(payload) {
          return _callback(mapConnectedClients(payload.connectedClients));
        }
      });
      return function () {
        _this4.eventHandlers = _this4.eventHandlers.filter(function (_ref3) {
          var id = _ref3.id;
          return id !== handlerId;
        });
      };
    }
    /**
     * Sets user information that is available in the [[onConnectedClientsChanged]] listener.
     *
     * @param     userInfo      Data to set for the client's user information.
     *
     * @example
     * ```javascript
     * Koji.dispatch.setUserInfo({ avatar: userAvatar });
     * ```
     */

  }, {
    key: "setUserInfo",
    value: function setUserInfo(userInfo) {
      this.emitEvent(PlatformEvents.SET_USER_INFO, userInfo);
    }
    /**
     * Identifies a connected client, which enables the server and other connected clients to send it secure messages.
     *
     * @param     authToken     Short-lived user token for the connected client. To get a user token, use {@doclink core-frontend-identity#getToken | Identity.getToken}.
     *
     * @example
     * ```javascript
     * const { userToken, presumedRole, presumedAttributes  } = await Koji.identity.getToken();
     * Koji.dispatch.identify(userToken);
     * ```
     */

  }, {
    key: "identify",
    value: function identify(authToken) {
      this.emitEvent(PlatformEvents.IDENTIFY, {
        token: authToken
      });
    }
    /**
     * Emits the named event to the specified recipients or to all clients.
     *
     * @param     eventName     Name of the event.
     * @param     payload       Object of key-value pair data to send as a message payload.
     * @param     recipients    List of clients to receive the event. If this parameter is not included, the event is sent to all clients on the current shard.
     *
     * @example
     * ```javascript
     * Koji.dispatch.emitEvent('myEvent', myDataPayload);
     * ```
     */

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
    /**
     * Disconnects the client from the dispatch shard.
     *
     * @example
     * ```javascript
     * Koji.dispatch.disconnect();
     * ```
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.ws) this.ws.close();
      this.ws = null;
    }
  }]);
  return Dispatch;
}();

exports.Dispatch = Dispatch;
var dispatch = new Dispatch();
exports.dispatch = dispatch;
//# sourceMappingURL=index.js.map