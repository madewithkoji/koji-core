"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = exports.Identity = void 0;

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
 * Manages authentication and authorization on the frontend of your Koji.
 */
var Identity = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Identity, _KojiBridge);

  var _super = _createSuper(Identity);

  function Identity() {
    (0, _classCallCheck2["default"])(this, Identity);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Identity, [{
    key: "getToken",

    /**
     * Gets a token identifying the current user.
     *
     * @example
     * ```javascript
     * const token = await Koji.identity.getToken();
     * ```
     */
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$this$sendMessa, userToken;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/auth/getToken',
                  data: {
                    grants: [],
                    allowAnonymous: true
                  }
                }, 'KojiAuth.TokenCreated');

              case 2:
                _yield$this$sendMessa = _context.sent;
                userToken = _yield$this$sendMessa.userToken;
                return _context.abrupt("return", userToken);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getToken() {
        return _getToken.apply(this, arguments);
      }

      return getToken;
    }()
    /**
     * Checks whether the user has granted authorizations to the Koji. Use this method to determine whether to request authorization for certain capabilities.
     *
     * @param   grants        List of authorization grants to check for the user.
     * @return                Indicates whether the user has already granted authorization for the capabilities.
     *
     * @example
     * ```javascript
     * const hasGrant = await Koji.identity.checkGrants(['username', 'push_notifications']);
     * ```
     */

  }, {
    key: "checkGrants",
    value: function () {
      var _checkGrants = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var grants,
            _yield$this$sendMessa2,
            hasGrants,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                grants = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
                _context2.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/auth/checkGrant',
                  data: {
                    grants: grants
                  }
                }, 'KojiAuth.GrantsResolved');

              case 3:
                _yield$this$sendMessa2 = _context2.sent;
                hasGrants = _yield$this$sendMessa2.hasGrants;
                return _context2.abrupt("return", hasGrants);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkGrants() {
        return _checkGrants.apply(this, arguments);
      }

      return checkGrants;
    }()
    /**
     * Requests the specified authorization grants from the user for the Koji.
     *
     * @param   grants           List of authorization grants to request from the user.
     * @param   usageDescription Custom message to display when requesting the grant.
     * @return
     *
     * @example
     * ```javascript
     * const hasGrant = await Koji.identity.requestGrants(['username', 'push_notifications']);
     * ```
     */

  }, {
    key: "requestGrants",
    value: function () {
      var _requestGrants = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var grants,
            usageDescription,
            _yield$this$sendMessa3,
            userToken,
            _args3 = arguments;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                grants = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                usageDescription = _args3.length > 1 ? _args3[1] : undefined;
                _context3.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/auth/getToken',
                  data: {
                    grants: grants,
                    usageDescription: usageDescription
                  }
                }, 'KojiAuth.TokenCreated', 'KojiAuth.GrantsDenied');

              case 4:
                _yield$this$sendMessa3 = _context3.sent;
                userToken = _yield$this$sendMessa3.userToken;
                return _context3.abrupt("return", userToken);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function requestGrants() {
        return _requestGrants.apply(this, arguments);
      }

      return requestGrants;
    }()
  }]);
  return Identity;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getToken", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "getToken"), _class.prototype)), _class);
exports.Identity = Identity;
var identity = new Identity();
exports.identity = identity;
//# sourceMappingURL=index.js.map