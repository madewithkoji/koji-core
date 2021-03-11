"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerState = exports.PlayerState = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _qs = _interopRequireDefault(require("qs"));

var _kojiBridge = require("../kojiBridge");

var _client = require("../@decorators/client");

var _class, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Manages the context of the Koji to enable distinct experiences for different users and views.
 */
var PlayerState = (_class = (_temp = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(PlayerState, _KojiBridge);

  var _super = _createSuper(PlayerState);

  function PlayerState() {
    var _this;

    (0, _classCallCheck2["default"])(this, PlayerState);
    _this = _super.call(this); // ToDo: Make this better, as it's just a way to get around the isomorphism
    // of this package

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "context", 'default');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "receiptType", void 0);
    if (typeof window === 'undefined') return (0, _possibleConstructorReturn2["default"])(_this);

    var params = _qs["default"].parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    if (window.location.href.includes('koji-screenshot')) {
      _this.context = 'screenshot';
    } else {
      var _params$context = params.context,
          context = _params$context === void 0 ? 'default' : _params$context,
          receiptType = params['dynamic-receipt'];
      _this.context = context;
      _this.receiptType = receiptType;
    }

    return _this;
  }
  /**
   * Listens to changes in remix state and invokes a callback function to enable different experiences during remix, preview, or use.
   *
   * @param   callback
   * @return           Function to unsubscribe from remix state listener.
   * @example
   * ```javascript
   * const unsubscribe = Koji.playerState.subscribe((remixing, { type, mode }) => {
   *  // Change Koji experience
   * });
   * ```
   */


  (0, _createClass2["default"])(PlayerState, [{
    key: "subscribe",
    value: function subscribe(callback) {
      return this.execCallbackOnMessage(function (_ref) {
        var isRemixing = _ref.isRemixing,
            editorAttributes = _ref.editorAttributes;
        callback(isRemixing, editorAttributes);
      }, 'KojiPreview.IsRemixing');
    }
  }]);
  return PlayerState;
}(_kojiBridge.KojiBridge), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "subscribe", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "subscribe"), _class.prototype)), _class);
exports.PlayerState = PlayerState;
var playerState = new PlayerState();
exports.playerState = playerState;
//# sourceMappingURL=index.js.map