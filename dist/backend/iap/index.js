"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IAP = exports.IapRoutes = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _server = require("../@decorators/server");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
    _classCallCheck(this, IAP);

    _defineProperty(this, "projectId", void 0);

    _defineProperty(this, "projectToken", void 0);

    _defineProperty(this, "rootPath", void 0);

    _defineProperty(this, "rootHeaders", void 0);

    this.projectId = res.locals.projectId || process.env.KOJI_PROJECT_ID;
    this.projectToken = res.locals.projectToken || process.env.KOJI_PROJECT_TOKEN;
    this.rootPath = 'https://rest.api.gokoji.com';
    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json'
    };
  }

  _createClass(IAP, [{
    key: "resolveReceiptsByUserToken",
    value: function () {
      var _resolveReceiptsByUserToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userToken) {
        var _yield$axios$post, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS), {
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
      var _resolveReceiptById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(receiptId) {
        var _yield$axios$post2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPT_BY_ID), {
                  headers: this.rootHeaders,
                  data: {
                    receiptId: receiptId
                  }
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
      var _resolveReceiptsBySku = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sku) {
        var _yield$axios$post3, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.RESOLVE_RECEIPTS_BY_SKU), {
                  headers: this.rootHeaders,
                  data: {
                    sku: sku
                  }
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
      var _updateReceipt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(receiptId, attributes, notificationMessage) {
        var _yield$axios$post4, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(IapRoutes.UPDATE_RECEIPT), {
                  headers: this.rootHeaders,
                  data: {
                    receiptId: receiptId,
                    attributes: attributes,
                    notificationMessage: notificationMessage
                  }
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
      var _loadProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sku) {
        var _yield$axios$get, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
}(), _temp), (_applyDecoratedDescriptor(_class.prototype, "resolveReceiptsByUserToken", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsByUserToken"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resolveReceiptById", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptById"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resolveReceiptsBySku", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "resolveReceiptsBySku"), _class.prototype)), _class);
exports.IAP = IAP;
//# sourceMappingURL=index.js.map