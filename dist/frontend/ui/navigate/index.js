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
 * Allow for navigation within a koji.
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
     * Navigate replaces the currently loaded Koji with the content of `url`
     *
     * @param url The url to navigate to
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
     * Presents the currently loaded Koji in a sheet that animates from
     * the bottom of the screen. If the parent Koji is already presented in a
     * modal, presenting a new Koji will navigate within the sheet instead of
     * presenting another sheet.
     *
     * @param url The url to present in the modal
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
     * Programmatically create a new remix.
     *
     * @param appId [appId] An optional app id; if this parameter is omitted, the current Koji will be remixed
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
     * Programmatically navigate to the Koji's edit experience. This should only be called if the template knows that the user is an admin, otherwise the user will not be authorized to edit the Koji.
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
     * Dismiss a Koji that has been presented in a popover
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
     * Programmatically open the Koji's share sheet/dialog.
     */

  }, {
    key: "openShareDialog",
    value: function openShareDialog() {
      this.sendMessage({
        kojiEventName: 'Koji.Share',
        data: {}
      });
    }
  }]);
  return Navigate;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "to", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "to"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "presentInModal", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "presentInModal"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "createRemix", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "createRemix"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "edit", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "edit"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "dismiss", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "dismiss"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "openShareDialog", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "openShareDialog"), _class.prototype)), _class);
exports.Navigate = Navigate;
var navigate = new Navigate();
exports.navigate = navigate;
//# sourceMappingURL=index.js.map