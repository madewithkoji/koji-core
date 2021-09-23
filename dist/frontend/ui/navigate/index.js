"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigate = exports.Navigate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _kojiBridge = require("../../kojiBridge");

var _client = require("../../@decorators/client");

var _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Provides methods for controlling navigation within your Koji app.
 */
var Navigate = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Navigate, _KojiBridge);

  var _super = _createSuper(Navigate);

  function Navigate() {
    (0, _classCallCheck2["default"])(this, Navigate);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Navigate, [{
    key: "to",

    /**
     * Replaces the currently loaded Koji with the content at the specified URL.
     *
     * @param url URL of the content to load.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.to(url)}>
     *  My favorite Koji
     * </button>
     * ```
     */
    value: function to(url) {
      this.sendMessage({
        kojiEventName: 'Koji.Navigate',
        data: {
          url: url
        }
      });
    }
    /**
     * Opens the content at the specified URL in a modal window that animates from the bottom of the screen.
     * If the parent Koji is already displayed in a modal window, the content will open in the same window, replacing the current view.
     *
     * @param url URL of the content to load.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.presentInModal(url)}>
     *   My favorite Koji
     * </button>
     * ```
     */

  }, {
    key: "presentInModal",
    value: function presentInModal(url) {
      this.sendMessage({
        kojiEventName: 'Koji.Navigate',
        data: {
          presentationType: 'modal',
          url: url
        }
      });
    }
    /**
     * Starts a new customization.
     *
     * @param appId ID of the Koji project to customize. Defaults to the current Koji app if an ID is not specified.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.createRemix()}>
     *   Create my own customization
     * </button>
     * ```
     */

  }, {
    key: "createRemix",
    value: function createRemix(appId) {
      this.sendMessage({
        kojiEventName: 'Koji.CreateRemix',
        data: {
          options: {
            id: appId
          }
        }
      });
    }
    /**
     * Opens the Koji app in editing mode.
     *
     * NOTE: Check that the current user is an admin before calling this method.
     * Otherwise, the user will not be authorized to edit the Koji app.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.edit()}>
     *   Edit this Koji
     * </button>
     * ```
     */

  }, {
    key: "edit",
    value: function edit() {
      this.sendMessage({
        kojiEventName: 'Koji.Edit',
        data: {}
      });
    }
    /**
     * Closes a Koji app that is in a modal window.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.dismiss()}>
     *   Close window
     * </button>
     * ```
     */

  }, {
    key: "dismiss",
    value: function dismiss() {
      this.sendMessage({
        kojiEventName: 'Koji.Dismiss',
        data: {}
      });
    }
    /**
     * Opens the sharing dialog box. By default, the dialog box shares the URL of the current Koji.
     * Specify a full or a relative URL to open a dialog box for sharing a different URL or for a deep link into your Koji app.
     *
     * NOTE: If you use this method to share a deep link in your Koji app, a `koji.to` short URL is automatically created for it.
     *
     * @param url URL to use instead of the current Koji.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog()}>
     *   Share this Koji
     * </button>
     *
     * // full URL
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog('https://withkoji.com/@myname')}>
     *   Share your profile
     * </button>
     *
     * // relative URL
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog('?key=value')}>
     *   Share this info
     * </button>
     * ```
     */

  }, {
    key: "openShareDialog",
    value: function openShareDialog(url) {
      this.sendMessage({
        kojiEventName: 'Koji.Share',
        data: {
          url: url
        }
      });
    }
  }]);
  return Navigate;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "to", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "to"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "presentInModal", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "presentInModal"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "createRemix", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "createRemix"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "edit", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "edit"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "dismiss", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "dismiss"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "openShareDialog", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "openShareDialog"), _class.prototype)), _class);
exports.Navigate = Navigate;
var navigate = new Navigate();
exports.navigate = navigate;
//# sourceMappingURL=index.js.map