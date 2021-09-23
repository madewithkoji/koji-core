"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utilities = void 0;

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

/**
 * API routes for utilities.
 */
var UtilitiesRoutes;
/**
 * Provides utility methods for improving the performance and functionality of your Koji app.
 */

(function (UtilitiesRoutes) {
  UtilitiesRoutes["UNFREEZE_KEY"] = "/v1/apps/hooks/cache/unfreeze";
})(UtilitiesRoutes || (UtilitiesRoutes = {}));

var Utilities = (_class = (_temp = /*#__PURE__*/function (_Base) {
  (0, _inherits2["default"])(Utilities, _Base);

  var _super = _createSuper(Utilities);

  /**
   * Instantiates the Utilities class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const utilities = new KojiBackend.Utilities({ res });
   * ```
   */
  function Utilities(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Utilities);
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
   * Unfreezes a response that has been frozen with an `x-koji-freeze-key` header.
   *
   * @param   key      Key used to freeze the response.
   *
   * @example
   * ```javascript
   * app.get('/loadPosts', async (req, res) => {
   *    const posts = [{ value: 'postValue' }];
   *
   *    res.setHeader('x-koji-freeze-key', 'posts');
   *    res.status(200).json({
   *        posts,
   *    });
   * });
   *
   * app.post('/update', async (req, res) => {
   *    // Update some data in the database
   *    // await db.update....
   *
   *    // Unfreeze. The next request to /loadPosts will hit the server and get
   *    // a fresh list of posts, which will then be frozen until unfreeze is
   *    // called again.
   *    await utilities.unfreeze('posts');
   *
   *    res.sendStatus(200);
   * });
   * ```
   */


  (0, _createClass2["default"])(Utilities, [{
    key: "unfreeze",
    value: function () {
      var _unfreeze = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(key) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post("".concat(this.rootPath).concat(UtilitiesRoutes.UNFREEZE_KEY), {
                  key: key
                }, {
                  headers: this.rootHeaders
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function unfreeze(_x) {
        return _unfreeze.apply(this, arguments);
      }

      return unfreeze;
    }()
  }]);
  return Utilities;
}(_base.Base), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "unfreeze", [_server.server], Object.getOwnPropertyDescriptor(_class.prototype, "unfreeze"), _class.prototype)), _class);
exports.Utilities = Utilities;
//# sourceMappingURL=index.js.map