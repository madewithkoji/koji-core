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
 * Defines an interface for a receipt.
 */

exports.IapRoutes = IapRoutes;

(function (IapRoutes) {
  IapRoutes["GET_PRODUCT_BY_SKU"] = "/v1/iap/provider/getProductBySku";
  IapRoutes["RESOLVE_RECEIPTS"] = "/v1/iap/consumer/resolveReceipts";
  IapRoutes["RESOLVE_RECEIPT_BY_ID"] = "/v1/iap/consumer/resolveReceiptById";
  IapRoutes["RESOLVE_RECEIPTS_BY_SKU"] = "/v1/iap/consumer/resolveReceiptsBySku";
  IapRoutes["UPDATE_RECEIPT"] = "/v1/iap/consumer/updateReceiptAttributes";
})(IapRoutes || (exports.IapRoutes = IapRoutes = {}));

/**
 * Implements in-app purchases for the backend of your Koji.
 */
var IAP = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(IAP, _Base);

  var _super = _createSuper(IAP);

  /**
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
   * Get receipts by user token
   *
   * @param     authToken     User token.
   * @return                  Array of receipts.
   *
   * @example
   * ```javascript
   * const receipts = iap.resolveReceiptsByUserToken(token);
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
     * Get receipts by receipt id
     *
     * @param     receiptId     Receipt id.
     * @return                  Array of receipts.
     *
     * @example
     * ```javascript
     * const receipt = iap.resolveReceiptById(id);
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
     * Get receipts for a product by sku
     *
     * @param     sku     Product sku.
     * @return            Array of receipts that include the product.
     *
     * @example
     * ```javascript
     * const receipts = iap.resolveReceiptById(sku);
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
     * Update receipt
     *
     * @param     receiptId     Receipt id.
     * @param     attributes    Object of key-value paired attributes to store with the receipt.
     * @param     notificationMessage    Optional notification message.
     * @return                  Data object.
     *
     * @example
     * ```javascript
     * iap.updateReceipt(id, { consumed: true }, 'You have successfully redeemed your purchase.');
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
     * Load product by sku.
     *
     * @param     sku     Product sku.
     * @return            Data object.
     *
     * @example
     * ```javascript
     * iap.loadProduct(sku);
     * ```
     */

  }, {
    key: "loadProduct",
    value: function () {
      var _loadProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(sku) {
        var _yield$axios$get, product;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _axios["default"].get("".concat(this.rootPath).concat(IapRoutes.GET_PRODUCT_BY_SKU, "?appId=").concat(this.projectId, "&sku=").concat(sku), {
                  headers: this.rootHeaders
                });

              case 2:
                _yield$axios$get = _context5.sent;
                product = _yield$axios$get.data.product;
                return _context5.abrupt("return", product);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadProduct(_x7) {
        return _loadProduct.apply(this, arguments);
      }

      return loadProduct;
    }()
  }]);
  return IAP;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsByIAPToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsByIAPToken"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptById", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptById"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsBySku", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsBySku"), _class.prototype)), _class);
exports.IAP = IAP;
//# sourceMappingURL=index.js.map