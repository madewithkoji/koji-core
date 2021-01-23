"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Secret = void 0;

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SecretRoutes;

(function (SecretRoutes) {
  SecretRoutes["KEYSTORE_GET"] = "/v1/keystore/get";
  SecretRoutes["CREATE_SIGNED_REQUEST"] = "/v1/cdn/signedRequest/create";
})(SecretRoutes || (SecretRoutes = {}));

var Secret = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(Secret, _Base);

  var _super = _createSuper(Secret);

  function Secret(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Secret);
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

  (0, _createClass2["default"])(Secret, [{
    key: "resolveValue",
    value: function () {
      var _resolveValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(keyPath) {
        var _yield$axios$post, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(SecretRoutes.KEYSTORE_GET), {
                  scope: this.projectId,
                  token: this.projectToken,
                  keyPath: keyPath
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                console.log('d', data);
                return _context.abrupt("return", data.decryptedValue);

              case 6:
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
      var _generateSignedUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resource, expireSeconds) {
        var _yield$axios$post2, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(SecretRoutes.CREATE_SIGNED_REQUEST), {
                  resource: resource,
                  expireSeconds: expireSeconds
                }, {
                  headers: this.rootHeaders
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
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveValue", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveValue"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "generateSignedUrl", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "generateSignedUrl"), _class.prototype)), _class);
exports.Secret = Secret;
//# sourceMappingURL=index.js.map