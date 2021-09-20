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
 * Manages the state of the Koji player to enable distinct experiences for different users and views.
 */
var PlayerState = (_class = (_temp = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(PlayerState, _KojiBridge);

  var _super = _createSuper(PlayerState);

  /** Context of the Koji app. */

  /** Type of receipt. */

  /** Focus state of the Koji app. */

  /** Presentation style of the Koji app. */

  /** Whether the player chrome (Koji platform buttons and navigation) is visible. */
  function PlayerState() {
    var _this;

    (0, _classCallCheck2["default"])(this, PlayerState);
    _this = _super.call(this); // ToDo: Make this better, as it's just a way to get around the isomorphism
    // of this package

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "context", 'default');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "receiptType", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hasFocus", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "presentationStyle", 'fullscreen');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isChromeVisible", false);
    if (typeof window === 'undefined') return (0, _possibleConstructorReturn2["default"])(_this); // Pull off any query parameters

    var params = _qs["default"].parse(window.location.search, {
      ignoreQueryPrefix: true
    }); // First, look for the screenshot context


    if (window.location.href.includes('koji-screenshot')) {
      _this.context = 'screenshot';
    } else {
      // Otherwise, pull the context from the query parameters
      var _params$context = params.context,
          context = _params$context === void 0 ? 'default' : _params$context,
          receiptType = params['dynamic-receipt'],
          _params$presentationS = params.presentationStyle,
          presentationStyle = _params$presentationS === void 0 ? 'fullscreen' : _params$presentationS;
      _this.context = context;
      _this.receiptType = receiptType;
      _this.presentationStyle = presentationStyle;
    } // Set the initial value based on the feed hash


    _this.hasFocus = !window.KOJI_FEED_KEY;

    if (_this.presentationStyle === 'fullscreen') {
      _this.isChromeVisible = true;
    }

    return _this;
  }
  /**
   * Listens for event notifications that the Koji app got the focus and then invokes a callback function to respond to the focus state change.
   *
   * @param   callback  Function to handle when the Koji app gets the focus.
   *
   * @return            Function to unsubscribe from the onFocus listener.
   *
   * @example
   * ```javascript
   * const unsubscribeFocus = Koji.playerState.onFocus((focus) => {
   *  // Change Koji experience
   * });
   * ```
   */


  (0, _createClass2["default"])(PlayerState, [{
    key: "onFocus",
    value: function onFocus(callback) {
      this.hasFocus = true;
      return this.execCallbackOnMessage(function () {
        callback();
      }, 'KojiFeed.Play');
    }
    /**
     * Listens for event notifications that the Koji app lost the focus and then invokes a callback function to respond to the focus state change.
     *
     * @param   callback Function to handle when the Koji app loses the focus.
     *
     * @return            Function to unsubscribe from the onBlur listener.
     *
     * @example
     * ```javascript
     * const unsubscribeBlur = Koji.playerState.onBlur((blur) => {
     *  // Change Koji experience
     * });
     * ```
     */

  }, {
    key: "onBlur",
    value: function onBlur(callback) {
      this.hasFocus = false;
      return this.execCallbackOnMessage(function () {
        callback();
      }, 'KojiFeed.Pause');
    }
    /**
     * Hides any Koji player chrome, such as the user's profile icon.
     * To display the player chrome, use [[showChrome]].
     *
     * NOTE: Incorrectly controlling the player chrome can result in a disorienting user experience, so use this functionality judiciously.
     * The player chrome must be displayed on all root screens of an app. It can be hidden if a user navigates to a child screen, such as a modal.
     * The player chrome is hidden by default when the app's `presentationStyle` is `popover`.
     *
     * @example
     * ```javascript
     * Koji.playerState.hideChrome();
     * ```
     */

  }, {
    key: "hideChrome",
    value: function hideChrome() {
      this.sendMessage({
        kojiEventName: 'Koji.Player.HideChrome',
        data: {}
      });
      this.isChromeVisible = false;
    }
    /**
     * Restores the Koji platform chrome, if it has been hidden with [[hideChrome]].
     *
     * @example
     * ```javascript
     * Koji.playerState.showChrome();
     * ```
     */

  }, {
    key: "showChrome",
    value: function showChrome() {
      this.sendMessage({
        kojiEventName: 'Koji.Player.ShowChrome',
        data: {}
      });
      this.isChromeVisible = true;
    }
    /**
     * Listens to changes in customization mode and invokes a callback function to enable different experiences during customization, preview, or use.
     *
     * @param   callback Function to handle changes in customization mode.
     *
     * @return           Function to unsubscribe from the customization mode listener.
     *
     * @example
     * ```javascript
     * const unsubscribe = Koji.playerState.subscribe((remixing, { type, mode }) => {
     *  // Change Koji experience
     * });
     * ```
     */

  }, {
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
}(_kojiBridge.KojiBridge), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "onFocus", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "onFocus"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "onBlur", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "onBlur"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "hideChrome", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "hideChrome"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "subscribe", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "subscribe"), _class.prototype)), _class);
exports.PlayerState = PlayerState;
var playerState = new PlayerState();
exports.playerState = playerState;
//# sourceMappingURL=index.js.map