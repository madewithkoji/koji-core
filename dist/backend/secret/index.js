"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Secret = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _server = require("../@decorators/server");

var _base = require("../base");

var _class, _temp;

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var SecretRoutes;

(function (SecretRoutes) {
  SecretRoutes["KEYSTORE_GET"] = "/v1/keystore/get";
  SecretRoutes["CREATE_SIGNED_REQUEST"] = "/v1/cdn/signedRequest/create";
})(SecretRoutes || (SecretRoutes = {}));

var Secret = (_class = (_temp = /*#__PURE__*/function (_Base) {
  _inherits(Secret, _Base);

  var _super = _createSuper(Secret);

  function Secret(config) {
    var _this;

    _classCallCheck(this, Secret);

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

  _createClass(Secret, [{
    key: "resolveValue",
    value: function () {
      var _resolveValue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyPath) {
        var _yield$axios$post, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(SecretRoutes.KEYSTORE_GET), {
                  headers: this.rootHeaders,
                  data: {
                    scope: this.projectId,
                    token: this.projectToken,
                    keyPath: keyPath
                  }
                });

              case 2:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                return _context.abrupt("return", data.decryptedValue);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveValue(_x) {
        return _resolveValue.apply(this, arguments);
      }

      return resolveValue;
    }()
  }, {
    key: "generateSignedUrl",
    value: function () {
      var _generateSignedUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resource, expireSeconds) {
        var _yield$axios$post2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(SecretRoutes.CREATE_SIGNED_REQUEST), {
                  headers: this.rootHeaders,
                  data: {
                    resource: resource,
                    expireSeconds: expireSeconds
                  }
                });

              case 2:
                _yield$axios$post2 = _context2.sent;
                data = _yield$axios$post2.data;
                return _context2.abrupt("return", data.url);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generateSignedUrl(_x2, _x3) {
        return _generateSignedUrl.apply(this, arguments);
      }

      return generateSignedUrl;
    }()
  }]);

  return Secret;
}(_base.Base), _temp), (_applyDecoratedDescriptor(_class.prototype, "resolveValue", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "generateSignedUrl", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "generateSignedUrl"), _class.prototype)), _class);
exports.Secret = Secret;
//# sourceMappingURL=index.js.map