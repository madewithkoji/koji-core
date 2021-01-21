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

var _bridge = require("../bridge");

var _client = require("../@decorators/client");

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "values", void 0);
    return _this;
  }

  (0, _createClass2["default"])(Remix, [{
    key: "subscribe",
    value: function subscribe(callback) {
      return this.execCallbackOnMessage(function (_ref) {
        var isRemixing = _ref.isRemixing,
            editorAttributes = _ref.editorAttributes;
        callback(isRemixing, editorAttributes);
      }, 'KojiPreview.IsRemixing');
    }
  }, {
    key: "init",
    value: function init(values) {
      if (this.values) throw new Error('You are trying to initialize your remix data more than one time.');

      if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
        this.values = (0, _deepmerge["default"])(values, window.KOJI_OVERRIDES.overrides, {
          arrayMerge: function arrayMerge(dest, source) {
            return source;
          }
        });
      } else {
        this.values = values;
      }
    }
  }, {
    key: "get",
    value: function get(path) {
      var pointer = this.values;

      for (var i = 0; i < path.length; i += 1) {
        pointer = pointer[path[i]];
      }

      return pointer;
    }
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path, newValue) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.SetValue',
                  data: {
                    path: path,
                    newValue: newValue,
                    skipUpdate: true
                  }
                }, 'KojiPreview.DidChangeVcc');

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

      function set(_x, _x2) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }]);
  return Remix;
}(_bridge.KojiBridge), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "subscribe", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "subscribe"), _class.prototype)), _class);
exports.Remix = Remix;
var remix = new Remix();
exports.remix = remix;
//# sourceMappingURL=index.js.map