"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = exports.PredicateOperator = exports.DatabaseRoutes = void 0;

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DatabaseRoutes;
exports.DatabaseRoutes = DatabaseRoutes;

(function (DatabaseRoutes) {
  DatabaseRoutes["ARRAY_PUSH"] = "/v1/store/update/push";
  DatabaseRoutes["ARRAY_REMOVE"] = "/v1/store/update/remove";
  DatabaseRoutes["DELETE"] = "/v1/store/delete";
  DatabaseRoutes["GET"] = "/v1/store/get";
  DatabaseRoutes["GET_ALL"] = "/v1/store/getAll";
  DatabaseRoutes["GET_ALL_WHERE"] = "/v1/store/getAllWhere";
  DatabaseRoutes["GET_COLLECTIONS"] = "/v1/store/getCollections";
  DatabaseRoutes["SEARCH"] = "/v1/store/search";
  DatabaseRoutes["SET"] = "/v1/store/set";
  DatabaseRoutes["UPDATE"] = "/v1/store/update";
})(DatabaseRoutes || (exports.DatabaseRoutes = DatabaseRoutes = {}));

var PredicateOperator;
exports.PredicateOperator = PredicateOperator;

(function (PredicateOperator) {
  PredicateOperator["LESS_THAN"] = "<";
  PredicateOperator["LESS_THAN_OR_EQUAL_TO"] = "<=";
  PredicateOperator["EQUAL_TO"] = "==";
  PredicateOperator["GREATER_THAN"] = ">";
  PredicateOperator["GREATER_THAN_OR_EQUAL_TO"] = ">=";
  PredicateOperator["NOT_EQUAL_TO"] = "!=";
  PredicateOperator["ARRAY_CONTAINS"] = "array-contains";
  PredicateOperator["ARRAY_CONTAINS_ANY"] = "array-contains-any";
  PredicateOperator["IN"] = "in";
  PredicateOperator["NOT_IN"] = "not-in";
})(PredicateOperator || (exports.PredicateOperator = PredicateOperator = {}));

var Database = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(Database, _Base);

  var _super = _createSuper(Database);

  function Database(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Database);
    _this = _super.call(this, config);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rootPath", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rootHeaders", void 0);
    _this.rootPath = 'https://database.api.gokoji.com';
    _this.rootHeaders = {
      'X-Koji-Project-Id': _this.projectId,
      'X-Koji-Project-Token': _this.projectToken,
      'Content-Type': 'application/json'
    };
    return _this;
  }

  (0, _createClass2["default"])(Database, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(collection, documentName) {
        var _yield$axios$post, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.GET), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                return _context.abrupt("return", data.document);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getCollections",
    value: function () {
      var _getCollections = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _yield$axios$post2, _yield$axios$post2$da, collections;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.GET_COLLECTIONS), {
                  headers: this.rootHeaders,
                  data: {}
                });

              case 2:
                _yield$axios$post2 = _context2.sent;
                _yield$axios$post2$da = _yield$axios$post2.data.collections;
                collections = _yield$axios$post2$da === void 0 ? [] : _yield$axios$post2$da;
                return _context2.abrupt("return", collections);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCollections() {
        return _getCollections.apply(this, arguments);
      }

      return getCollections;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(collection, queryKey, queryValue) {
        var _yield$axios$post3, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.SEARCH), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    queryKey: queryKey,
                    queryValue: queryValue
                  }
                });

              case 2:
                _yield$axios$post3 = _context3.sent;
                data = _yield$axios$post3.data;
                return _context3.abrupt("return", data);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x3, _x4, _x5) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "getWhere",
    value: function () {
      var _getWhere = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(collection, predicateKey, predicateOperation, predicateValue) {
        var _yield$axios$post4, data;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.GET), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    predicate: {
                      key: predicateKey,
                      operation: predicateOperation,
                      value: predicateValue
                    }
                  }
                });

              case 2:
                _yield$axios$post4 = _context4.sent;
                data = _yield$axios$post4.data;
                return _context4.abrupt("return", data.document);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getWhere(_x6, _x7, _x8, _x9) {
        return _getWhere.apply(this, arguments);
      }

      return getWhere;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(collection, documentNames) {
        var _yield$axios$post5, data;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.GET_ALL), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentNames: documentNames
                  }
                });

              case 2:
                _yield$axios$post5 = _context5.sent;
                data = _yield$axios$post5.data;
                return _context5.abrupt("return", data.results);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAll(_x10, _x11) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getAllWhere",
    value: function () {
      var _getAllWhere = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(collection, predicateKey, predicateOperation, predicateValues) {
        var _yield$axios$post6, data;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.GET_ALL_WHERE), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    predicateKey: predicateKey,
                    predicateOperation: predicateOperation,
                    predicateValues: predicateValues
                  }
                });

              case 2:
                _yield$axios$post6 = _context6.sent;
                data = _yield$axios$post6.data;
                return _context6.abrupt("return", data.results);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAllWhere(_x12, _x13, _x14, _x15) {
        return _getAllWhere.apply(this, arguments);
      }

      return getAllWhere;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(collection, documentName, documentBody) {
        var _yield$axios$post7, data;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.SET), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentBody: documentBody,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post7 = _context7.sent;
                data = _yield$axios$post7.data;
                return _context7.abrupt("return", data);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function set(_x16, _x17, _x18) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(collection, documentName, documentBody) {
        var _yield$axios$post8, data;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.UPDATE), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentBody: documentBody,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post8 = _context8.sent;
                data = _yield$axios$post8.data;
                return _context8.abrupt("return", data);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function update(_x19, _x20, _x21) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "arrayPush",
    value: function () {
      var _arrayPush = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(collection, documentName, documentBody) {
        var _yield$axios$post9, data;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.ARRAY_PUSH), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentBody: documentBody,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post9 = _context9.sent;
                data = _yield$axios$post9.data;
                return _context9.abrupt("return", data);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function arrayPush(_x22, _x23, _x24) {
        return _arrayPush.apply(this, arguments);
      }

      return arrayPush;
    }()
  }, {
    key: "arrayRemove",
    value: function () {
      var _arrayRemove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(collection, documentName, documentBody) {
        var _yield$axios$post10, data;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.ARRAY_REMOVE), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentBody: documentBody,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post10 = _context10.sent;
                data = _yield$axios$post10.data;
                return _context10.abrupt("return", data);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function arrayRemove(_x25, _x26, _x27) {
        return _arrayRemove.apply(this, arguments);
      }

      return arrayRemove;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(collection, documentName) {
        var _yield$axios$post11, data;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(DatabaseRoutes.DELETE), {
                  headers: this.rootHeaders,
                  data: {
                    collection: collection,
                    documentName: documentName
                  }
                });

              case 2:
                _yield$axios$post11 = _context11.sent;
                data = _yield$axios$post11.data;
                return _context11.abrupt("return", data);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _delete(_x28, _x29) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Database;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "get", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "get"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getCollections", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "getCollections"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "search", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "search"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getWhere", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "getWhere"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getAll", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "getAll"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getAllWhere", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "getAllWhere"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "set", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "update", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "arrayPush", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "arrayPush"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "arrayRemove", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "arrayRemove"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "delete", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "delete"), _class.prototype)), _class);
exports.Database = Database;
//# sourceMappingURL=index.js.map