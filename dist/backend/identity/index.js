"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identity = exports.AuthRoutes = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _axios = _interopRequireDefault(require("axios"));

var _server = require("../@decorators/server");

var _base = require("../base");

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * API routes for auth methods.
 */
var AuthRoutes;
/** Object containing information about capabilities that the user has authorized this Koji to use. */

exports.AuthRoutes = AuthRoutes;

(function (AuthRoutes) {
  AuthRoutes["GET_GRANT"] = "/v1/apps/auth/consumer/getGrantForToken";
  AuthRoutes["GET_ROLE"] = "/v1/apps/auth/consumer/getRoleForToken";
  AuthRoutes["PUSH_NOTIFICATION"] = "/v1/apps/auth/consumer/pushNotification";
})(AuthRoutes || (exports.AuthRoutes = AuthRoutes = {}));

/**
 * Manages authentication and authorization on the backend of your Koji app.
 */
var Identity = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(Identity, _Base);

  var _super = _createSuper(Identity);

  /**
   * Instantiates the Identity class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const identity = new KojiBackend.Identity({ res });
   * ```
   */
  function Identity(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Identity);
    _this = _super.call(this, config);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rootPath", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rootHeaders", void 0);
    _this.rootPath = 'https://rest.api.gokoji.com';
    _this.rootHeaders = {
      'X-Koji-Project-Id': _this.projectId,
      'X-Koji-Project-Token': _this.projectToken,
      'Content-Type': 'application/json'
    };
    return _this;
  }
  /**
   * Sends a notification to the user who interacted with the Koji app.
   *
   * @param     userId            User’s unique ID for this Koji. To get the user's ID, see [[resolveUserFromToken]].
   * @param     notification      Notification to send to the user.
   *
   * @example
   * ```javascript
   * const user = identity.resolveUserFromToken(userToken);
   *
   * await identity.pushNotificationToUser(user.id, {
   *  icon: '❓',
   *  appName: 'Ask me anything',
   *  message: 'Your custom video is ready! View now',
   *  ref: '?dynamic-receipt=buyer',
   * });
   * ```
   */


  (0, _createClass2["default"])(Identity, [{
    key: "pushNotificationToUser",
    value: function () {
      var _pushNotificationToUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, notification) {
        var _yield$axios$post, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.PUSH_NOTIFICATION), {
                  destination: userId,
                  notification: notification
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                return _context.abrupt("return", data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function pushNotificationToUser(_x, _x2) {
        return _pushNotificationToUser.apply(this, arguments);
      }

      return pushNotificationToUser;
    }()
    /**
     *  Sends a notification to the owner of the Koji app.
     *
     * @param     notification      Notification to send to the owner.
     *
     * @example
     * ```javascript
     * await identity.pushNotificationToOwner({
     *  icon: '❓',
     *  appName: 'Ask me anything',
     *  message: 'Someone asked you a question! Respond now',
     *  ref: '?dynamic-receipt=seller',
     * });
     * ```
     */

  }, {
    key: "pushNotificationToOwner",
    value: function () {
      var _pushNotificationToOwner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(notification) {
        var _yield$axios$post2, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.PUSH_NOTIFICATION), {
                  destination: 'owner',
                  notification: notification
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post2 = _context2.sent;
                data = _yield$axios$post2.data;
                return _context2.abrupt("return", data);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function pushNotificationToOwner(_x3) {
        return _pushNotificationToOwner.apply(this, arguments);
      }

      return pushNotificationToOwner;
    }()
    /**
     * Gets the user's information for this Koji.
     *
     * @param     token      Short-lived token identifying the current user, which is generated with the frontend identity module. See [[getToken]].
     * @return               Object containing information about the user.
     *
     * @example
     * ```javascript
     * // Get the user token (generated using the frontend identity module)
     * const userToken = req.headers.authorization;
     *
     * const user = await identity.resolveUserFromToken(userToken);
     * ```
     */

  }, {
    key: "resolveUserFromToken",
    value: function () {
      var _resolveUserFromToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
        var data, _data, role, grant;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _axios["default"].all([_axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.GET_ROLE), {}, {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Auth-Callback-Token': token
                  })
                }), _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.GET_GRANT), {}, {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Auth-Callback-Token': token
                  })
                })]);

              case 2:
                data = _context3.sent;
                _data = (0, _slicedToArray2["default"])(data, 2), role = _data[0].data.role, grant = _data[1].data.grant; // If the user hasn't granted any permissions, the only thing
                // we return is the role.

                if (grant) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", {
                  id: null,
                  attributes: null,
                  dateCreated: null,
                  grants: null,
                  role: role
                });

              case 6:
                return _context3.abrupt("return", {
                  id: grant.userId,
                  attributes: grant.attributes,
                  dateCreated: grant.dateCreated,
                  grants: {
                    pushNotificationsEnabled: grant.pushNotificationsEnabled
                  },
                  role: role
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resolveUserFromToken(_x4) {
        return _resolveUserFromToken.apply(this, arguments);
      }

      return resolveUserFromToken;
    }()
  }]);
  return Identity;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "pushNotificationToUser", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "pushNotificationToUser"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "pushNotificationToOwner", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "pushNotificationToOwner"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveUserFromToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveUserFromToken"), _class.prototype)), _class);
exports.Identity = Identity;
//# sourceMappingURL=index.js.map