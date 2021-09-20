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

/**
 * Manages in-app purchase transactions on the frontend of your Koji app.
 */
var IAP = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(IAP, _KojiBridge);

  var _super = _createSuper(IAP);

  function IAP() {
    (0, _classCallCheck2["default"])(this, IAP);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(IAP, [{
    key: "getToken",

    /**
     * Generates an IAP token for the current user that can be used to resolve receipts on the backend.
     *
     * @return    Short-lived IAP token for the current user.
     *
     * @example
     * ``` javascript
     * const iapToken = await Koji.iap.getToken();
     * ```
     */
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$this$sendMessa, userToken;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/iap/getToken',
                  data: {}
                }, 'KojiIap.TokenCreated');

              case 2:
                _yield$this$sendMessa = _context.sent;
                userToken = _yield$this$sendMessa.userToken;
                return _context.abrupt("return", userToken);

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
    /**
     * Prompts the user to purchase a product from the Koji app. Products are defined in the entitlements file and registered or updated when the project is deployed.
     *
     * NOTE: If your IAP product is defined with the `captureOnPurchase` key set to `false`, the transaction is held in a pending state until you manually invoke {@doclink core-backend-iap#captureTransaction | Iap.captureTransaction} on the backend of your Koji app.
     * Funds are not available in the seller's account until the transaction is captured.
     * If you do not capture the transaction before the `captureExpiryPeriod`, the transaction is automatically reversed and the buyer is refunded.
     * This period can be specified in the product definition from 0 to 7 days (default is 0).
     *
     * @param  sku               Identifier for the product to purchase.
     * @param  purchaseOptions   Optional information to add to the transaction receipt.
     * @param  customAttributes  Optional key-value pairs to add to the receipt. These attribute values can be referenced or updated by resolving receipts on the backend of the Koji app.
     *
     * @return                   Results of the in-app purchase transaction.
     *
     * @example
     * ``` javascript
     * const purchase = await Koji.iap.startPurchase(sku);
     *
     * // with optional parameters
     * const purchase = await Koji.iap.startPurchase(sku, { customMessage: 'Your credit is now available' }, { isConsumed: false });
     * ```
     */

  }, {
    key: "startPurchase",
    value: function () {
      var _startPurchase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(sku) {
        var purchaseOptions,
            customAttributes,
            _yield$this$sendMessa2,
            success,
            userToken,
            receiptId,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                purchaseOptions = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                customAttributes = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/iap/promptPurchase',
                  data: {
                    sku: sku,
                    purchaseOptions: purchaseOptions,
                    customAttributes: customAttributes
                  }
                }, 'KojiIap.PurchaseFinished');

              case 4:
                _yield$this$sendMessa2 = _context2.sent;
                success = _yield$this$sendMessa2.success;
                userToken = _yield$this$sendMessa2.userToken;
                receiptId = _yield$this$sendMessa2.receiptId;
                return _context2.abrupt("return", {
                  success: success,
                  iapToken: userToken,
                  receiptId: receiptId
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function startPurchase(_x) {
        return _startPurchase.apply(this, arguments);
      }

      return startPurchase;
    }()
  }]);
  return IAP;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getToken", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "getToken"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "startPurchase", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "startPurchase"), _class.prototype)), _class);
exports.IAP = IAP;
var iap = new IAP();
exports.iap = iap;
//# sourceMappingURL=index.js.map