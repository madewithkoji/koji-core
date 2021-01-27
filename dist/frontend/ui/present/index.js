"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.present = exports.Present = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _kojiBridge = require("../../kojiBridge");

var _client = require("../../@decorators/client");

var _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Present = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Present, _KojiBridge);

  var _super = _createSuper(Present);

  function Present() {
    (0, _classCallCheck2["default"])(this, Present);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Present, [{
    key: "confirmation",
    value: function () {
      var _confirmation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var options,
            data,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.ConfirmPrompt',
                  data: {
                    title: options.title,
                    message: options.message,
                    confirmButtonLabel: options.confirmButtonLabel,
                    cancelButtonLabel: options.cancelButtonLabel
                  }
                }, 'Koji.ConfirmResolved');

              case 3:
                data = _context.sent;
                return _context.abrupt("return", data.didConfirm);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function confirmation() {
        return _confirmation.apply(this, arguments);
      }

      return confirmation;
    }()
  }, {
    key: "alert",
    value: function alert(options) {
      this.sendMessage({
        kojiEventName: 'Koji.Alert',
        data: {
          title: options.title,
          message: options.message,
          confirmButtonLabel: options.confirmButtonLabel,
          cancelButtonLabel: options.cancelButtonLabel
        }
      });
    }
  }]);
  return Present;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "confirmation", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "confirmation"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "alert", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "alert"), _class.prototype)), _class);
exports.Present = Present;
var present = new Present();
exports.present = present;
//# sourceMappingURL=index.js.map