"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identity = exports.UserRole = exports.AuthRoutes = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _server = require("../@decorators/server");

var _base = require("../base");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var AuthRoutes;
exports.AuthRoutes = AuthRoutes;

(function (AuthRoutes) {
  AuthRoutes["GET_GRANT"] = "/v1/apps/auth/consumer/getGrantForToken";
  AuthRoutes["GET_ROLE"] = "/v1/apps/auth/consumer/getRoleForToken";
  AuthRoutes["PUSH_NOTIFICATION"] = "/v1/apps/auth/consumer/pushNotification";
})(AuthRoutes || (exports.AuthRoutes = AuthRoutes = {}));

var UserRole;
exports.UserRole = UserRole;

(function (UserRole) {
  UserRole["ADMIN"] = "admin";
  UserRole["UNKNOWN"] = "unknown";
  UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));

var Identity = (_class = (_temp = /*#__PURE__*/function (_Base) {
  _inherits(Identity, _Base);

  var _super = _createSuper(Identity);

  function Identity(config) {
    var _this;

    _classCallCheck(this, Identity);

    _this = _super.call(this, config);

    _defineProperty(_assertThisInitialized(_this), "rootPath", void 0);

    _defineProperty(_assertThisInitialized(_this), "rootHeaders", void 0);

    _this.rootPath = 'https://rest.api.gokoji.com';
    _this.rootHeaders = {
      'X-Koji-Project-Id': _this.projectId,
      'X-Koji-Project-Token': _this.projectToken,
      'Content-Type': 'application/json'
    };
    return _this;
  }

  _createClass(Identity, [{
    key: "pushNotificationToUser",
    value: function () {
      var _pushNotificationToUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, notification) {
        var _yield$axios$post, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.PUSH_NOTIFICATION), {
                  headers: this.rootHeaders,
                  data: {
                    destination: userId,
                    notification: notification
                  }
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
  }, {
    key: "pushNotificationToOwner",
    value: function () {
      var _pushNotificationToOwner = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(notification) {
        var _yield$axios$post2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.PUSH_NOTIFICATION), {
                  headers: this.rootHeaders,
                  data: {
                    destination: 'owner',
                    notification: notification
                  }
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
  }, {
    key: "resolveUserFromToken",
    value: function () {
      var _resolveUserFromToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
        var _yield$axios$post3, role, _yield$axios$post4, grant;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.GET_ROLE), {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Auth-Callback-Token': token
                  })
                });

              case 2:
                _yield$axios$post3 = _context3.sent;
                role = _yield$axios$post3.data.role;
                _context3.next = 6;
                return _axios["default"].post("".concat(this.rootPath).concat(AuthRoutes.GET_ROLE), {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Auth-Callback-Token': token
                  })
                });

              case 6:
                _yield$axios$post4 = _context3.sent;
                grant = _yield$axios$post4.data.grant;
                return _context3.abrupt("return", {
                  id: grant.userId,
                  attributes: grant.attributes,
                  dateCreated: grant.dateCreated,
                  pushNotificationsEnabled: grant.pushNotificationsEnabled,
                  role: role
                });

              case 9:
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
}(_base.Base), _temp), (_applyDecoratedDescriptor(_class.prototype, "pushNotificationToUser", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "pushNotificationToUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pushNotificationToOwner", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "pushNotificationToOwner"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resolveUserFromToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveUserFromToken"), _class.prototype)), _class);
exports.Identity = Identity;
//# sourceMappingURL=index.js.map