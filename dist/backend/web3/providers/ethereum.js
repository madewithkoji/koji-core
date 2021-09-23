"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EthereumProvider = void 0;

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

var _server = require("../../@decorators/server");

var _base = require("../../base");

var _class, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * API routes for utilities.
 */
var EthereumRoutes;
/**
 * Provides utility methods for improving the performance and functionality of your Koji app.
 */

(function (EthereumRoutes) {
  EthereumRoutes["GET_BALANCE"] = "/v1/apps/hooks/web3/erc721/balanceOf";
})(EthereumRoutes || (EthereumRoutes = {}));

var EthereumProvider = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(EthereumProvider, _Base);

  var _super = _createSuper(EthereumProvider);

  /**
   * Instantiates the Ethereum class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const ethereum = new KojiBackend.web3.ethereum({ res });
   * ```
   */
  function EthereumProvider(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, EthereumProvider);
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
   * Get a balance for an account ID
   *
   * @param   contractId      The ID of the smart contract
   * @param   accountAddress  The address of the account to query
   *
   * @example
   * ```javascript
   * const balance = await ethereum.getERC721Balance(
   *    '0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb',
   *    '0x1702a1e7b9823e8e73efc19be25eea2712b9de22',
   * );
   * ```
   */


  (0, _createClass2["default"])(EthereumProvider, [{
    key: "getERC721Balance",
    value: function () {
      var _getERC721Balance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(contractId, accountAddress) {
        var _yield$axios$post, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _axios["default"].post("".concat(this.rootPath).concat(EthereumRoutes.GET_BALANCE), {
                  contractId: contractId,
                  accountAddress: accountAddress
                }, {
                  headers: this.rootHeaders
                });

              case 3:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                return _context.abrupt("return", data.balance);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", 0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getERC721Balance(_x, _x2) {
        return _getERC721Balance.apply(this, arguments);
      }

      return getERC721Balance;
    }()
  }]);
  return EthereumProvider;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "getERC721Balance", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "getERC721Balance"), _class.prototype)), _class);
exports.EthereumProvider = EthereumProvider;
//# sourceMappingURL=ethereum.js.map