"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IAP = exports.IapRoutes = void 0;

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * API routes for iap methods.
 */
var IapRoutes;
/**
 * Receipt for a user’s purchase of a product.
 * Resolve receipts with [[resolveReceiptById]], [[resolveReceiptsByIAPToken]], or [[resolveReceiptsBySku]].
 * Add custom attributes for to a receipt with [[updateReceipt]].
 */

exports.IapRoutes = IapRoutes;

(function (IapRoutes) {
  IapRoutes["GET_PRODUCT_BY_SKU"] = "/v1/iap/consumer/getProductBySku";
  IapRoutes["RESOLVE_RECEIPTS"] = "/v1/iap/consumer/resolveReceipts";
  IapRoutes["RESOLVE_RECEIPT_BY_ID"] = "/v1/iap/consumer/resolveReceiptById";
  IapRoutes["RESOLVE_RECEIPTS_BY_SKU"] = "/v1/iap/consumer/resolveReceiptsBySku";
  IapRoutes["UPDATE_RECEIPT"] = "/v1/iap/consumer/updateReceiptAttributes";
  IapRoutes["CAPTURE_TRANSACTION"] = "/v1/iap/consumer/captureTransaction";
  IapRoutes["REFUND_TRANSACTION"] = "/v1/iap/consumer/refundTransaction";
})(IapRoutes || (exports.IapRoutes = IapRoutes = {}));

/**
 * Manages in-app purchases on the backend of your Koji app.
 */
var IAP = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(IAP, _Base);

  var _super = _createSuper(IAP);

  /**
   * Instantiates the IAP class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const iap = new KojiBackend.IAP({ res });
   * ```
   */
  function IAP(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, IAP);
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
  /**
   * Gets all receipts for the current user, which can be used to validate purchases for specific products.
   *
   * @param     iapToken     Short-lived IAP token for the current user.
   *
   * @return                 Array of receipts for the user's purchases.
   *
   * @example
   * ```javascript
   * const receipts = await iap.resolveReceiptsByIAPToken(iapToken);
   * ```
   */


  (0, _createClass2["default"])(IAP, [{
    key: "resolveReceiptsByIAPToken",
    value: function () {
      var _resolveReceiptsByIAPToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(iapToken) {
        var _yield$axios$post, _yield$axios$post$dat, receipts;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS), {}, {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Iap-Callback-Token': iapToken
                  })
                });

              case 2:
                _yield$axios$post = _context.sent;
                _yield$axios$post$dat = _yield$axios$post.data.receipts;
                receipts = _yield$axios$post$dat === void 0 ? [] : _yield$axios$post$dat;
                return _context.abrupt("return", receipts);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveReceiptsByIAPToken(_x) {
        return _resolveReceiptsByIAPToken.apply(this, arguments);
      }

      return resolveReceiptsByIAPToken;
    }()
    /**
     * Gets a specific transaction receipt by its ID, which can be used to facilitate fulfillment.
     * For example, use a dynamic receipt to upload a video response from the seller and then share that response with the buyer.
     * Or, capture product options, such as color or size, to display to the seller in an admin view.
     *
     * @param     receiptId     Unique identifier for the receipt.
     * @return                  Object for the specified receipt.
     *
     * @example
     * ```javascript
     * const receipt = await iap.resolveReceiptById(id);
     *
     * // Use custom attributes for a video response
     * this.setState({
     *  instructions: receipt.attributes.message,
     *  video: receipt.attributes.video,
     * });
     * ```
     */

  }, {
    key: "resolveReceiptById",
    value: function () {
      var _resolveReceiptById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(receiptId) {
        var _yield$axios$post2, receipt;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPT_BY_ID), {
                  receiptId: receiptId
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post2 = _context2.sent;
                receipt = _yield$axios$post2.data.receipt;
                return _context2.abrupt("return", receipt);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function resolveReceiptById(_x2) {
        return _resolveReceiptById.apply(this, arguments);
      }

      return resolveReceiptById;
    }()
    /**
     * Gets all receipts for a specified product, which can be used to aggregate sales data.
     *
     * @param     sku     Identifier for the product. Products are defined in the entitlements file and registered or updated when the project is deployed.
     * @return            Array of receipts for the specified product.
     *
     * @example
     * ```javascript
     * const receipts = await iap.resolveReceiptBySku(sku);
     * ```
     */

  }, {
    key: "resolveReceiptsBySku",
    value: function () {
      var _resolveReceiptsBySku = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(sku) {
        var _yield$axios$post3, receipts;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS_BY_SKU), {
                  sku: sku
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post3 = _context3.sent;
                receipts = _yield$axios$post3.data.receipts;
                return _context3.abrupt("return", receipts);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resolveReceiptsBySku(_x3) {
        return _resolveReceiptsBySku.apply(this, arguments);
      }

      return resolveReceiptsBySku;
    }()
    /**
     * Updates the custom attributes for a specified receipt.
     * For example, if a user purchases a credit toward a product on the Koji app and then uses it, you can update the receipt to indicate that the credit has been consumed and is not available for future sessions.
     *
     * @param     receiptId             Unique identifier for the receipt.
     * @param     attributes            Object of key-value paired attributes to store with the receipt.
     * @param     notificationMessage   Custom message to sent the user when the receipt is updated (up to 80 characters). If undefined, the message will read: `Your receipt for PRODUCT_NAME was updated.`
     *
     * @return                          Confirmation of the update, if the request was successful, or an error message, if not.
     *
     * @example
     * ```javascript
     * iap.updateReceipt(id, { consumed: true }, 'You have successfully redeemed your credit.');
     * ```
     */

  }, {
    key: "updateReceipt",
    value: function () {
      var _updateReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(receiptId, attributes, notificationMessage) {
        var _yield$axios$post4, data;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.UPDATE_RECEIPT), {
                  receiptId: receiptId,
                  attributes: attributes,
                  notificationMessage: notificationMessage
                }, {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$post4 = _context4.sent;
                data = _yield$axios$post4.data;
                return _context4.abrupt("return", data);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateReceipt(_x4, _x5, _x6) {
        return _updateReceipt.apply(this, arguments);
      }

      return updateReceipt;
    }()
    /**
     * Captures a pending transaction.
     *
     * NOTE: If your IAP product is defined with the `captureOnPurchase` key set to `false`, the transaction is held in a pending state until you manually invoke `captureTransaction`.
     * Funds are not available in the seller's account until the transaction is captured.
     * If you do not capture the transaction before the `captureExpiryPeriod`, the transaction is automatically reversed and the buyer is refunded.
     * This period can be specified in the product definition from 0 to 7 days (default is 0).
     *
     * @param receiptId Unique identifier for the transaction receipt.
     *
     * @example
     *
     * ```javascript
     * iap.captureTransaction(receiptId);
     * ```
     */

  }, {
    key: "captureTransaction",
    value: function () {
      var _captureTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(receiptId) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.CAPTURE_TRANSACTION), {
                  receiptId: receiptId
                }, {
                  headers: this.rootHeaders
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function captureTransaction(_x7) {
        return _captureTransaction.apply(this, arguments);
      }

      return captureTransaction;
    }()
    /**
     * Refunds a transaction.
     *
     * NOTE: Only unsettled transactions can be refunded.
     *
     * @param receiptId Unique identifier for the transaction receipt.
     *
     * @example
     * ```javascript
     * iap.refundTransaction(receiptId);
     * ```
     */

  }, {
    key: "refundTransaction",
    value: function () {
      var _refundTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(receiptId) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.REFUND_TRANSACTION), {
                  receiptId: receiptId
                }, {
                  headers: this.rootHeaders
                });

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function refundTransaction(_x8) {
        return _refundTransaction.apply(this, arguments);
      }

      return refundTransaction;
    }()
    /**
     * Gets the properties of a specified product, which enables the app to leverage dynamic product information.
     * For example, you can check the stock for a product with limited quantity (via the `numAvailable` property), and indicate the number of remaining items.
     *
     * @param     sku     Identifier for the product.
     * @return            Properties of the specified product.
     *
     * @example
     * ```javascript
     * const product = await iap.loadProduct(sku);
     * ```
     */

  }, {
    key: "loadProduct",
    value: function () {
      var _loadProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(sku) {
        var _yield$axios$get, product;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _axios["default"].get("".concat(this.rootPath).concat(IapRoutes.GET_PRODUCT_BY_SKU, "?sku=").concat(sku), {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$get = _context7.sent;
                product = _yield$axios$get.data.product;
                return _context7.abrupt("return", product);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function loadProduct(_x9) {
        return _loadProduct.apply(this, arguments);
      }

      return loadProduct;
    }()
  }]);
  return IAP;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsByIAPToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsByIAPToken"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptById", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptById"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsBySku", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsBySku"), _class.prototype)), _class);
exports.IAP = IAP;
//# sourceMappingURL=index.js.map