"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3Provider = exports.Web3Provider = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _kojiBridge = require("../kojiBridge");

var _client = require("../@decorators/client");

var _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Manages authentication and authorization on the frontend of your Koji app.
 */
var Web3Provider = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Web3Provider, _KojiBridge);

  var _super = _createSuper(Web3Provider);

  function Web3Provider() {
    (0, _classCallCheck2["default"])(this, Web3Provider);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Web3Provider, [{
    key: "isConnected",

    /**
     * Gets whether or not the session is connect
     *
     * @return    Is connected
     *
     * @example
     * ```javascript
     * const isConnected = await Koji.web3.isConnected();
     * ```
     */
    value: function () {
      var _isConnected = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$this$sendMessa, isConnected;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/web3/ethereum/isConnected',
                  data: {}
                }, 'KojiWeb3.Ethereum.IsConnected');

              case 2:
                _yield$this$sendMessa = _context.sent;
                isConnected = _yield$this$sendMessa.isConnected;
                return _context.abrupt("return", isConnected);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isConnected() {
        return _isConnected.apply(this, arguments);
      }

      return isConnected;
    }()
    /**
     * Proxies a request to an Ethereum wallet provider.
     *
     * @param   request       The request to proxy
     * @return                Request result
     *
     * @example
     * ```javascript
     * const accounts = await Koji.web3.request({ method: 'eth_requestAccounts' });
     * ```
     */

  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(args) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/web3/ethereum/request',
                  data: {
                    args: args
                  }
                }, 'KojiWeb3.Ethereum.RequestFinished');

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request(_x) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
    /**
     * Register an event listener for wallet events
     *
     * @param   event             The name of the event for which to listen.
     * @param   callback          Called when the event is received
     *
     *
     * @example
     * ```javascript
     * Koji.web3.on('accountsChanged', ({ accounts }) => {
     *   console.log(accounts);
     * })
     * ```
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      var scopedEventName = "KojiWeb3.Ethereum.Events.".concat(event);
      this.registerMessageListener(scopedEventName, callback);
    }
  }]);
  return Web3Provider;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "isConnected", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "isConnected"), _class.prototype)), _class);
exports.Web3Provider = Web3Provider;
var web3Provider = new Web3Provider();
exports.web3Provider = web3Provider;
//# sourceMappingURL=index.js.map