"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remix = exports.Remix = void 0;

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

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _get2 = require("../../utils/get");

var _client = require("../@decorators/client");

var _kojiBridge = require("../kojiBridge");

var _class, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Manages the customization experience for your Koji app.
 */
var Remix = (_class = (_temp = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Remix, _KojiBridge);

  var _super = _createSuper(Remix);

  function Remix() {
    var _this;

    (0, _classCallCheck2["default"])(this, Remix);
    _this = _super.call(this); // After Koji.ready() is invoked, the platform will always respond with a `KojiPreview.IsRemixing`
    // message. This allows us to use an actual response from the platform to ensure that
    // finish and set aren't called before a ready() resolution.

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "values", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isInitialized", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hasReceivedReadyResponse", false);

    if (typeof window !== 'undefined') {
      _this.execCallbackOnMessage(function () {
        _this.hasReceivedReadyResponse = true;
      }, 'KojiPreview.IsRemixing');
    }

    return _this;
  }
  /**
   * Initializes the Koji app's customization data with default values.
   *
   * NOTE: In most cases, you do not need to call this method manually because it is automatically called when you initialize the package with `Koji.config`.
   * Use this method only if you want to use the Remix class by itself, without any other classes in the package.
   *
   * @param   remixData    Object containing the default values for your Koji app.
   *
   * @example
   * ```javascript
   * import { remixData } from '../../koji.json;
   *
   * Koji.remix.init(remixData));
   * ```
   */


  (0, _createClass2["default"])(Remix, [{
    key: "init",
    value: function init(remixData) {
      if (!remixData) throw new Error('Unable to find remixData');

      if (this.isInitialized) {
        throw new Error('You already initialized your configuration data. Note that Koji.config() automatically calls this method.');
      }

      this.isInitialized = true;
      var overrides = {};

      if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
        overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
      }

      this.values = (0, _deepmerge["default"])(remixData, overrides, {
        arrayMerge: function arrayMerge(dest, source) {
          return source;
        }
      });
    }
    /**
     * Gets the customization data for the Koji app.
     *
     * @param   path   Array of keys to target a specific value in the object.
     * @param   defaultValue   Value to return if no value exists at the targeted path.
     * @return  Object containing the current customization data.
     *
     * @example
     * ```javascript
     *
     * // Return the entire `remixData` object
     * const values = Koji.remix.get();
     *
     * // Return a particular value
     * const backgroundColor = Koji.remix.get(['colors', 'background']);
     *
     * // Return a particular value with a default if the value is not defined
     * const textColor = Koji.remix.get(['colors', 'text'], '#000000');
     * ```
     */

  }, {
    key: "get",
    value: function get(path, defaultValue) {
      if (!path) return this.values;
      return (0, _get2.get)(this.values, path, defaultValue);
    }
    /**
     * Updates the specified values in the customization data.
     *
     * NOTE: This method updates only the values that are specified in `newValue`. If other values exist, they are not changed. To replace all customization data, use [[overwrite]].
     *
     * @param   newValue      Key-value pairs to update in the customization data.
     * @return                Indicates whether the values were successfully updated.
     *
     * @example
     * ```javascript
     * await Koji.remix.set({'myColor': color});
     * ```
     */

  }, {
    key: "set",
    value: function set(newValue) {
      if (!this.hasReceivedReadyResponse) throw new Error('It looks like you are trying to call the `Koji.remix.set()` method before calling `Koji.ready(). This will prevent data from being stored properly.`');
      this.values = (0, _deepmerge["default"])(this.values, newValue, {
        arrayMerge: function arrayMerge(dest, source) {
          return source;
        }
      });
      return this.sendValues();
    }
    /**
     * Replaces all customization data with the specified object.
     *
     * NOTE: This method overwrites all existing values in the customization data.
     * To update specific values only, use [[set]].
     *
     * @param   newValues Object containing the new customization data for the Koji app.
     * @return            Indicates whether the customization data was successfully replaced.
     *
     * @example
     * ```javascript
     * await Koji.remix.overwrite({'myColor': color, 'myText': text});
     * ```
     */

  }, {
    key: "overwrite",
    value: function overwrite(newValues) {
      this.values = newValues;
      return this.sendValues();
    }
    /**
     * Advances the Koji app's mode from customization to preview.
     *
     * @example
     * ```html
     * <button onClick={() => Koji.remix.finish()}>
     *  Next
     * </button>
     * ```
     */

  }, {
    key: "finish",
    value: function finish() {
      if (!this.hasReceivedReadyResponse) throw new Error('It looks like you are trying to call the `Koji.remix.finish()` method before calling `Koji.ready(). This will result in unpredictable behavior in the preview of the customized app.`');
      this.sendMessage({
        kojiEventName: 'KojiPreview.Finish'
      });
    }
    /**
     * Cancels the customization experience and returns to where the user was before they started customization. If the user has made changes, they are prompted to confirm the cancellation.
     *
     * @example
     * ```javascript
     * Koji.remix.cancel();
     * ```
     */

  }, {
    key: "cancel",
    value: function cancel() {
      this.sendMessage({
        kojiEventName: 'KojiPreview.Cancel'
      });
    }
    /**
     * Stores sensitive data as an encrypted value. The sensitive data can only be accessed programmatically and is not available when the Koji app is configured.
     *
     * @param   rawValue       Value to encrypt.
     * @return                 Encrypted value. Use this value to [[decryptValue | decrypt the value]] on the frontend, for the creator, or to {@doclink core-backend-secret#resolveValue | resolve the value} on the backend, for other users.
     *
     * @example
     * ```javascript
     * const encryptPath = await Koji.remix.encryptValue(text);
     * ```
     */

  }, {
    key: "encryptValue",
    value: function () {
      var _encryptValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(rawValue) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.EncryptValue',
                  data: {
                    plaintextValue: rawValue
                  }
                }, 'KojiPreview.ValueEncrypted');

              case 2:
                data = _context.sent;
                return _context.abrupt("return", data.encryptedValue);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function encryptValue(_x) {
        return _encryptValue.apply(this, arguments);
      }

      return encryptValue;
    }()
    /**
     * Retrieves sensitive data that was [[encryptValue | stored as an encrypted value]].
     *
     * NOTE: Only the owner of the Koji app can access the decrypted value with this method. For example, to check that the value was entered correctly. To retrieve the value for other users, use {@doclink core-backend-secret#resolveValue | Secret.resolveValue} on the backend.
     *
     * @param   encryptedValue Path where the encrypted value is stored.
     * @return                 Decrypted value.
     *
     * @example
     * ```javascript
     * const value = await Koji.remix.decryptValue(encryptPath);
     * ```
     */

  }, {
    key: "decryptValue",
    value: function () {
      var _decryptValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(encryptedValue) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.DecryptValue',
                  data: {
                    encryptedValue: encryptedValue
                  }
                }, 'KojiPreview.ValueDecrypted');

              case 2:
                data = _context2.sent;
                return _context2.abrupt("return", data.decryptedValue);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function decryptValue(_x2) {
        return _decryptValue.apply(this, arguments);
      }

      return decryptValue;
    }()
    /**
     * Sends an event to update the preview with the current customization data.
     *
     * @return
     */

  }, {
    key: "sendValues",
    value: function () {
      var _sendValues = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'KojiPreview.SetValue',
                  data: {
                    path: ['remixData'],
                    newValue: this.values,
                    skipUpdate: false
                  }
                }, 'KojiPreview.DidChangeVcc');

              case 2:
                data = _context3.sent;
                return _context3.abrupt("return", !!data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendValues() {
        return _sendValues.apply(this, arguments);
      }

      return sendValues;
    }()
  }]);
  return Remix;
}(_kojiBridge.KojiBridge), _temp), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "init", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "get", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "get"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "set", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "overwrite", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "overwrite"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "finish", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "finish"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "cancel", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "cancel"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "encryptValue", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "encryptValue"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "decryptValue", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "decryptValue"), _class.prototype)), _class);
exports.Remix = Remix;
var remix = new Remix();
exports.remix = remix;
//# sourceMappingURL=index.js.map