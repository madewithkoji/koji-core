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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _axios = _interopRequireDefault(require("axios"));

var _server = require("../@decorators/server");

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var IapRoutes;
exports.IapRoutes = IapRoutes;

(function (IapRoutes) {
  IapRoutes["GET_PRODUCT_BY_SKU"] = "/v1/iap/provider/getProductBySku";
  IapRoutes["RESOLVE_RECEIPTS"] = "/v1/iap/consumer/resolveReceipts";
  IapRoutes["RESOLVE_RECEIPT_BY_ID"] = "/v1/iap/consumer/resolveReceiptById";
  IapRoutes["RESOLVE_RECEIPTS_BY_SKU"] = "/v1/iap/consumer/resolveReceiptsBySku";
  IapRoutes["UPDATE_RECEIPT"] = "/v1/iap/consumer/updateReceiptAttributes";
})(IapRoutes || (exports.IapRoutes = IapRoutes = {}));

var IAP = (_class = (_temp = /*#__PURE__*/function () {
  function IAP(res) {
    (0, _classCallCheck2["default"])(this, IAP);
    (0, _defineProperty2["default"])(this, "projectId", void 0);
    (0, _defineProperty2["default"])(this, "projectToken", void 0);
    (0, _defineProperty2["default"])(this, "rootPath", void 0);
    (0, _defineProperty2["default"])(this, "rootHeaders", void 0);
    this.projectId = res.locals.projectId || process.env.KOJI_PROJECT_ID;
    this.projectToken = res.locals.projectToken || process.env.KOJI_PROJECT_TOKEN;
    this.rootPath = 'https://rest.api.gokoji.com';
    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json'
    };
  }

  (0, _createClass2["default"])(IAP, [{
    key: "resolveReceiptsByUserToken",
    value: function () {
      var _resolveReceiptsByUserToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userToken) {
        var _yield$axios$post, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS), {}, {
                  headers: _objectSpread(_objectSpread({}, this.rootHeaders), {}, {
                    'X-Koji-Iap-Callback-Token': userToken
                  })
                });

              case 3:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                return _context.abrupt("return", data);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", []);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function resolveReceiptsByUserToken(_x) {
        return _resolveReceiptsByUserToken.apply(this, arguments);
      }

      return resolveReceiptsByUserToken;
    }()
  }, {
    key: "resolveReceiptById",
    value: function () {
      var _resolveReceiptById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(receiptId) {
        var _yield$axios$post2, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPT_BY_ID), {
                  receiptId: receiptId
                }, {
                  headers: this.rootHeaders
                });

              case 3:
                _yield$axios$post2 = _context2.sent;
                data = _yield$axios$post2.data;
                return _context2.abrupt("return", data);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", null);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function resolveReceiptById(_x2) {
        return _resolveReceiptById.apply(this, arguments);
      }

      return resolveReceiptById;
    }()
  }, {
    key: "resolveReceiptsBySku",
    value: function () {
      var _resolveReceiptsBySku = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(sku) {
        var _yield$axios$post3, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS_BY_SKU), {
                  sku: sku
                }, {
                  headers: this.rootHeaders
                });

              case 3:
                _yield$axios$post3 = _context3.sent;
                data = _yield$axios$post3.data;
                return _context3.abrupt("return", data);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", []);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function resolveReceiptsBySku(_x3) {
        return _resolveReceiptsBySku.apply(this, arguments);
      }

      return resolveReceiptsBySku;
    }()
  }, {
    key: "updateReceipt",
    value: function () {
      var _updateReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(receiptId, attributes, notificationMessage) {
        var _yield$axios$post4, data;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.UPDATE_RECEIPT), {
                  receiptId: receiptId,
                  attributes: attributes,
                  notificationMessage: notificationMessage
                }, {
                  headers: this.rootHeaders
                });

              case 3:
                _yield$axios$post4 = _context4.sent;
                data = _yield$axios$post4.data;
                return _context4.abrupt("return", data);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw new Error('Service error');

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function updateReceipt(_x4, _x5, _x6) {
        return _updateReceipt.apply(this, arguments);
      }

      return updateReceipt;
    }()
  }, {
    key: "loadProduct",
    value: function () {
      var _loadProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(sku) {
        var _yield$axios$get, data;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _axios["default"].get("".concat(this.rootPath).concat(IapRoutes.GET_PRODUCT_BY_SKU, "?appId=").concat(this.projectId, "&sku=").concat(sku), {
                  headers: this.rootHeaders
                });

              case 3:
                _yield$axios$get = _context5.sent;
                data = _yield$axios$get.data;
                return _context5.abrupt("return", data);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", null);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function loadProduct(_x7) {
        return _loadProduct.apply(this, arguments);
      }

      return loadProduct;
    }()
  }]);
  return IAP;
}(), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsByUserToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsByUserToken"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptById", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptById"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "resolveReceiptsBySku", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsBySku"), _class.prototype)), _class);
exports.IAP = IAP;
//# sourceMappingURL=index.js.map