"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iap = exports.IAP = void 0;

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

var IAP = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(IAP, _KojiBridge);

  var _super = _createSuper(IAP);

  function IAP() {
    (0, _classCallCheck2["default"])(this, IAP);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(IAP, [{
    key: "startPurchase",
    value: function () {
      var _startPurchase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(sku) {
        var purchaseOptions,
            _yield$this$sendMessa,
            success,
            userToken,
            receiptId,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                purchaseOptions = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/iap/promptPurchase',
                  data: {
                    sku: sku,
                    purchaseOptions: purchaseOptions
                  }
                }, 'KojiIap.PurchaseFinished');

              case 3:
                _yield$this$sendMessa = _context.sent;
                success = _yield$this$sendMessa.success;
                userToken = _yield$this$sendMessa.userToken;
                receiptId = _yield$this$sendMessa.receiptId;
                return _context.abrupt("return", {
                  success: success,
                  userToken: userToken,
                  receiptId: receiptId
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function startPurchase(_x) {
        return _startPurchase.apply(this, arguments);
      }

      return startPurchase;
    }()
  }]);
  return IAP;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "startPurchase", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "startPurchase"), _class.prototype)), _class);
exports.IAP = IAP;
var iap = new IAP();
exports.iap = iap;
//# sourceMappingURL=index.js.map