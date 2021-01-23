"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remix = exports.Remix = void 0;

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

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _client = require("../@decorators/client");

var _kojiBridge = require("../kojiBridge");

var _class, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Remix = (_class = (_temp = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Remix, _KojiBridge);

  var _super = _createSuper(Remix);

  function Remix() {
    var _this;

    (0, _classCallCheck2["default"])(this, Remix);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "values", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isInitialized", false);
    return _this;
  }

  (0, _createClass2["default"])(Remix, [{
    key: "init",
    value: function init(kojiConfig) {
      var remixData = kojiConfig.remixData;
      if (!remixData) throw new Error('Unable to find remixData');

      if (this.isInitialized) {
        console.warn('You are trying to initialize your remix data more than one time.');
        return;
      }

      this.isInitialized = true;
      var overrides = {};

      if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
        overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
      }

      this.values = (0, _deepmerge["default"])(remixData, overrides, {
        arrayMerge: function arrayMerge(dest, source) {
          return source;
        }
      });
    }
  }, {
    key: "get",
    value: function get() {
      return this.values;
    }
  }, {
    key: "set",
    value: function set(newValue) {
      this.values = (0, _deepmerge["default"])(this.values, newValue, {
        arrayMerge: function arrayMerge(dest, source) {
          return source;
        }
      });
      return this.sendValues();
    }
  }, {
    key: "overwrite",
    value: function overwrite(newValues) {
      this.values = newValues;
      return this.sendValues();
    }
  }, {
    key: "finish",
    value: function finish() {
      this.sendMessage({
        kojiEventName: 'KojiPreview.Finish'
      });
    }
  }, {
    key: "encryptValue",
    value: function () {
      var _encryptValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(plaintextValue) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.EncryptValue',
                  data: {
                    plaintextValue: plaintextValue
                  }
                }, 'KojiPreview.ValueEncrypted');

              case 2:
                data = _context.sent;
                return _context.abrupt("return", data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function encryptValue(_x) {
        return _encryptValue.apply(this, arguments);
      }

      return encryptValue;
    }()
  }, {
    key: "decryptValue",
    value: function () {
      var _decryptValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function decryptValue() {
        return _decryptValue.apply(this, arguments);
      }

      return decryptValue;
    }()
  }, {
    key: "sendValues",
    value: function () {
      var _sendValues = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.SetValue',
                  data: {
                    path: ['remixData'],
                    newValue: this.values,
                    skipUpdate: false
                  }
                }, 'KojiPreview.DidChangeVcc');

              case 2:
                data = _context3.sent;
                return _context3.abrupt("return", !!data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendValues() {
        return _sendValues.apply(this, arguments);
      }

      return sendValues;
    }()
  }]);
  return Remix;
}(_kojiBridge.KojiBridge), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "init", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "get", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "get"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "set", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "overwrite", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "overwrite"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "finish", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "finish"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "encryptValue", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "encryptValue"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "decryptValue", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "decryptValue"), _class.prototype)), _class);
exports.Remix = Remix;
var remix = new Remix();
exports.remix = remix;
//# sourceMappingURL=index.js.map