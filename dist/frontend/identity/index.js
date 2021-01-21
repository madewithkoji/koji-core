"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = exports.Identity = exports.AuthGrantCapability = void 0;

var _bridge = require("../bridge");

var _client = require("../@decorators/client");

var _class;

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var AuthGrantCapability;
exports.AuthGrantCapability = AuthGrantCapability;

(function (AuthGrantCapability) {
  AuthGrantCapability["PUSH_NOTIFICATIONS"] = "push_notifications";
  AuthGrantCapability["USERNAME"] = "username";
})(AuthGrantCapability || (exports.AuthGrantCapability = AuthGrantCapability = {}));

var Identity = (_class = /*#__PURE__*/function (_KojiBridge) {
  _inherits(Identity, _KojiBridge);

  var _super = _createSuper(Identity);

  function Identity() {
    _classCallCheck(this, Identity);

    return _super.apply(this, arguments);
  }

  _createClass(Identity, [{
    key: "getToken",
    value: function () {
      var _getToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$this$postToPla, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.postToPlatform({
                  kojiEventName: '@@koji/auth/getToken',
                  data: {
                    grants: [],
                    allowAnonymous: true
                  }
                }, 'KojiAuth.TokenCreated');

              case 2:
                _yield$this$postToPla = _context.sent;
                token = _yield$this$postToPla.token;
                return _context.abrupt("return", token);

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
  }, {
    key: "checkGrants",
    value: function () {
      var _checkGrants = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var grants,
            _yield$this$postToPla2,
            hasGrants,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                grants = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
                _context2.next = 3;
                return this.postToPlatform({
                  kojiEventName: '@@koji/auth/checkGrant',
                  data: {
                    grants: grants
                  }
                }, 'KojiAuth.GrantsResolved');

              case 3:
                _yield$this$postToPla2 = _context2.sent;
                hasGrants = _yield$this$postToPla2.hasGrants;
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
  }, {
    key: "requestGrants",
    value: function () {
      var _requestGrants = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var grants,
            usageDescription,
            _yield$this$postToPla3,
            hasGrants,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                grants = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                usageDescription = _args3.length > 1 ? _args3[1] : undefined;
                _context3.next = 4;
                return this.postToPlatform({
                  kojiEventName: '@@koji/auth/getToken',
                  data: {
                    grants: grants,
                    usageDescription: usageDescription
                  }
                }, 'KojiAuth.TokenCreated');

              case 4:
                _yield$this$postToPla3 = _context3.sent;
                hasGrants = _yield$this$postToPla3.hasGrants;
                return _context3.abrupt("return", hasGrants);

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
}(_bridge.KojiBridge), (_applyDecoratedDescriptor(_class.prototype, "getToken", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "getToken"), _class.prototype)), _class);
exports.Identity = Identity;
var identity = new Identity();
exports.identity = identity;
//# sourceMappingURL=index.js.map