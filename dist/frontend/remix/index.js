"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remix = exports.Remix = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _playerState = require("../playerState");

var _client = require("../@decorators/client");

var _class, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Remix = (_class = (_temp = /*#__PURE__*/function (_PlayerState) {
  (0, _inherits2["default"])(Remix, _PlayerState);

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
    value: function init(initialValues, remixInitialValues) {
      if (this.isInitialized) {
        console.warn('You are trying to initialize your remix data more than one time.');
        return;
      }

      this.isInitialized = true;
      var defaultValues = this.context === 'remix' ? remixInitialValues : initialValues;
      var overrides = {};

      if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
        overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
      }

      console.log('initialValues', initialValues);
      console.log('remixInitial', remixInitialValues);
      console.log('defaultValues', defaultValues);
      console.log('overrides', overrides);
      console.log('out', (0, _deepmerge["default"])(defaultValues, overrides, {
        arrayMerge: function arrayMerge(dest, source) {
          return source;
        }
      }));
      this.values = (0, _deepmerge["default"])(defaultValues, overrides, {
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
    key: "sendValues",
    value: function sendValues() {
      this.sendMessage({
        kojiEventName: 'KojiPreview.SetValue',
        data: {
          path: ['remixData'],
          newValue: this.values,
          skipUpdate: true
        }
      });
    }
  }]);
  return Remix;
}(_playerState.PlayerState), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "init", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "get", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "get"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "set", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "overwrite", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "overwrite"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "finish", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "finish"), _class.prototype)), _class);
exports.Remix = Remix;
var remix = new Remix();
exports.remix = remix;
//# sourceMappingURL=index.js.map