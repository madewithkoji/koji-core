"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capture = exports.Capture = exports.CaptureType = exports.CaptureStatus = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _kojiBridge = require("../../kojiBridge");

var _client = require("../../@decorators/client");

var _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/** Whether the user completed the selection (`succeeded`) or exited the control without selecting a value (`cancelled`). */
var CaptureStatus;
/** Capture method types. */

exports.CaptureStatus = CaptureStatus;

(function (CaptureStatus) {
  CaptureStatus["SUCCEEDED"] = "succeeded";
  CaptureStatus["CANCELLED"] = "cancelled";
})(CaptureStatus || (exports.CaptureStatus = CaptureStatus = {}));

var CaptureType;
/**
 * Metadata when the capture option for a media capture request's return type 
 * is set to `extended`.
 */

exports.CaptureType = CaptureType;

(function (CaptureType) {
  CaptureType["COLOR"] = "color";
  CaptureType["FILE"] = "file";
  CaptureType["IMAGE"] = "image";
  CaptureType["LINK"] = "link";
  CaptureType["MEDIA"] = "media";
  CaptureType["RANGE"] = "range";
  CaptureType["SELECT"] = "select";
  CaptureType["SOUND"] = "sound";
  CaptureType["VIDEO"] = "video";
})(CaptureType || (exports.CaptureType = CaptureType = {}));

/**
 * Captures user input on the frontend of your Koji.
 */
var Capture = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Capture, _KojiBridge);

  var _super = _createSuper(Capture);

  function Capture() {
    (0, _classCallCheck2["default"])(this, Capture);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Capture, [{
    key: "pickVerboseResultFromMessage",

    /**
     * Map capture data to a verbose result
     * @param data The capture data returned by the platform
     */
    value: function pickVerboseResultFromMessage(data) {
      if (data.status !== CaptureStatus.SUCCEEDED) {
        return {
          captureStatus: data.status,
          captureType: data.type,
          result: null,
          resultMetadata: null
        };
      }

      if (data.result && (0, _typeof2["default"])(data.result) === 'object') {
        var _data$result = data.result,
            url = _data$result.url,
            resultMetadata = (0, _objectWithoutProperties2["default"])(_data$result, ["url"]);
        return {
          captureStatus: data.status,
          captureType: data.type,
          result: url,
          resultMetadata: resultMetadata
        };
      }

      return {
        captureStatus: data.status,
        captureType: data.type,
        result: data.result,
        resultMetadata: {}
      };
    }
    /**
     * Map any non-successful capture data to a null return
     * @param data The capture data returned by the platform
     */

  }, {
    key: "pickResultFromMessage",
    value: function pickResultFromMessage(data) {
      if (data.status !== CaptureStatus.SUCCEEDED) {
        return null;
      }

      return data.result;
    }
    /**
     * Map `initialValue` to `value`, the key where the platform expects to see the initialValue in a postMessage
     * @param options The initial capture options passed by the user
     */

  }, {
    key: "transformInitialValueOptions",
    value: function transformInitialValueOptions(options) {
      var initialValue = options.initialValue,
          transformedOptions = (0, _objectWithoutProperties2["default"])(options, ["initialValue"]);
      if (initialValue) transformedOptions.value = initialValue;
      return transformedOptions;
    }
    /**
     * Prompts the user to select a color, either from a swatch or by entering a color code. Supports HEX, RGB, or HSL by default. Supports RBGA or HSLA, if transparency is enabled in the capture options.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the color code as a string.
     * @return          Color code as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const color = await Koji.ui.capture.color();
     *
     * // Enable transparency and return an object
     * const color = await Koji.ui.capture.color({ allowAlpha: true, verbose: true });
     * ```
     */

  }, {
    key: "color",
    value: function () {
      var _color = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var options,
            verbose,
            transformedOptions,
            data,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                verbose = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                transformedOptions = this.transformInitialValueOptions(options);
                _context.next = 5;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'color',
                    options: transformedOptions
                  }
                }, 'Koji.CaptureSuccess');

              case 5:
                data = _context.sent;

                if (!verbose) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 8:
                return _context.abrupt("return", this.pickResultFromMessage(data));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function color() {
        return _color.apply(this, arguments);
      }

      return color;
    }()
    /**
     * Prompts the user to select a value from a Custom VCC.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the value captured by the Custom VCC.
     * @return          Color code as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const music = await Koji.ui.capture.custom({ name: 'scloud' });
     * ```
     */

  }, {
    key: "custom",
    value: function () {
      var _custom = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options,
            verbose,
            name,
            url,
            typeOptions,
            data,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                verbose = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                name = options.name, url = options.url, typeOptions = (0, _objectWithoutProperties2["default"])(options, ["name", "url"]);

                if (!(!name && !url)) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Please supply the custom name or url for the Custom VCC you would like to load.');

              case 5:
                _context2.next = 7;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: "custom<".concat(name || url, ">"),
                    options: typeOptions
                  }
                }, 'Koji.CaptureSuccess');

              case 7:
                data = _context2.sent;

                if (!verbose) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 10:
                return _context2.abrupt("return", data.result);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function custom() {
        return _custom.apply(this, arguments);
      }

      return custom;
    }()
    /**
     * Prompts the user to upload a file of any type. Use this method to allow the user to upload raw files in their original format. For example, to capture high-resolution images for download rather than for display in a browser.
     *
     * To apply automatic transcoding and transformations for specific file types, use the associated method. See [[image]], [[video]], [[sound]], or [[media]].
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the file as a string.
     * @return          URL to the file as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const file = await Koji.ui.capture.file();
     *
     * // Return an object
     * const file = await Koji.ui.capture.file({ verbose: true });
     * ```
     */

  }, {
    key: "file",
    value: function () {
      var _file = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var options,
            verbose,
            data,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                verbose = _args3.length > 1 ? _args3[1] : undefined;
                _context3.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'file',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 4:
                data = _context3.sent;

                if (!verbose) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 7:
                return _context3.abrupt("return", this.pickResultFromMessage(data));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function file() {
        return _file.apply(this, arguments);
      }

      return file;
    }()
    /**
     * Prompts the user to select an image by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting an image.
     *
     * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the image asset as a string.
     * @return          URL to the image asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const image = await Koji.ui.capture.image();
     *
     * // Hide asset packs and return an object
     * const image = await Koji.ui.capture.image({ hideExtensions: true, verbose: true });
     * ```
     */

  }, {
    key: "image",
    value: function () {
      var _image = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var options,
            verbose,
            data,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                verbose = _args4.length > 1 ? _args4[1] : undefined;
                _context4.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'image',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 4:
                data = _context4.sent;

                if (!verbose) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 7:
                return _context4.abrupt("return", this.pickResultFromMessage(data));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function image() {
        return _image.apply(this, arguments);
      }

      return image;
    }()
    /**
     * Prompts the user to create a new Koji or select an existing Koji, either from the user’s profile or from a URL.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the Koji as a string.
     *
     * @return          URL to the Koji as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     * @example
     * ```javascript
     * const koji = await Koji.ui.capture.koji();
     *
     * // Return an object
     * const koji = await Koji.ui.capture.koji({ verbose: true });
     * ```
     */

  }, {
    key: "link",
    value: function () {
      var _link = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var options,
            verbose,
            data,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                verbose = _args5.length > 1 ? _args5[1] : undefined;
                _context5.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'link',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 4:
                data = _context5.sent;

                if (!verbose) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 7:
                return _context5.abrupt("return", this.pickResultFromMessage(data));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function link() {
        return _link.apply(this, arguments);
      }

      return link;
    }()
    /**
     * Prompts the user to select an image, file, sound, or video by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method to allow the user to select from more than one type of media with a single control. For example, allow the user to select an image or a video. You can limit the types of media to allow and configure options for each allowed type.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns only the value of the media capture, which is either the URL to the media as a string or an object with the URL and additional metadata.
     * @return          [description]
     *
     * @example
     * ```javascript
     * const media = await Koji.ui.capture.media();
     *
     * // Limit to image or video, hide asset packs, return an object with extended metadata, transcode videos for HLS
     * const media = await Koji.ui.capture.media({ acceptOnly: [image,video], hideExtensions: true, returnType: 'extended', videoOptions: { hls: true }, verbose: true });
     * ```
     */

  }, {
    key: "media",
    value: function () {
      var _media = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var options,
            verbose,
            _data,
            data,
            _args6 = arguments;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                verbose = _args6.length > 1 ? _args6[1] : undefined;

                if (!verbose) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 5;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'media',
                    options: _objectSpread(_objectSpread({}, options), {}, {
                      returnType: 'extended'
                    })
                  }
                }, 'Koji.CaptureSuccess');

              case 5:
                _data = _context6.sent;
                return _context6.abrupt("return", this.pickVerboseResultFromMessage(_data));

              case 7:
                _context6.next = 9;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'media',
                    options: _objectSpread(_objectSpread({}, options), {}, {
                      returnType: 'url'
                    })
                  }
                }, 'Koji.CaptureSuccess');

              case 9:
                data = _context6.sent;
                return _context6.abrupt("return", this.pickResultFromMessage(data));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function media() {
        return _media.apply(this, arguments);
      }

      return media;
    }()
    /**
     * Prompts the user to select a numeric value within a certain range. You can configure the minimum value, maximum value, and default increment.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the numeric value as a string.
     * @return          Numeric value as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const size = await Koji.ui.capture.range();
     *
     * // Return an object
     * const size = await Koji.ui.capture.range({ min: 0, max: 60, step: 3, verbose: true });
     * ```
     */

  }, {
    key: "range",
    value: function () {
      var _range = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var options,
            verbose,
            transformedOptions,
            data,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                verbose = _args7.length > 1 ? _args7[1] : undefined;
                transformedOptions = this.transformInitialValueOptions(options);
                _context7.next = 5;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'range',
                    options: transformedOptions
                  }
                }, 'Koji.CaptureSuccess');

              case 5:
                data = _context7.sent;

                if (!verbose) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 8:
                return _context7.abrupt("return", this.pickResultFromMessage(data));

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function range() {
        return _range.apply(this, arguments);
      }

      return range;
    }()
    /**
     * Prompts the user to select from a predefined list of options.
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the option as a string.
     * @return         Value of the predefined option as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const option = await Koji.ui.capture.select();
     *
     * // Select from three options
     * const option = await Koji.ui.capture.select(
     *  { options: [
     *    { value: "one", label: "Option one" },
     *    { value: "two", label: "Option two" },
     *    { value: "three", label: "Option three" }],
     *    placeholder: "Choose an option"});
     * ```
     */

  }, {
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var options,
            verbose,
            transformedOptions,
            data,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                verbose = _args8.length > 1 ? _args8[1] : undefined;
                transformedOptions = this.transformInitialValueOptions(options);
                _context8.next = 5;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'select',
                    options: transformedOptions
                  }
                }, 'Koji.CaptureSuccess');

              case 5:
                data = _context8.sent;

                if (!verbose) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 8:
                return _context8.abrupt("return", this.pickResultFromMessage(data));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function select() {
        return _select.apply(this, arguments);
      }

      return select;
    }()
    /**
     * Prompts the user to select a sound by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting a sound.
     *
     * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the audio asset as a string.
     * @return         URL to the audio asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const sound = await Koji.ui.capture.sound();
     *
     * // Hide asset packs and return an object
     * const sound = await Koji.ui.capture.sound({ hideExtensions: true, verbose: true });
     * ```
     */

  }, {
    key: "sound",
    value: function () {
      var _sound = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var options,
            verbose,
            data,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
                verbose = _args9.length > 1 ? _args9[1] : undefined;
                _context9.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'sound',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 4:
                data = _context9.sent;

                if (!verbose) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 7:
                return _context9.abrupt("return", this.pickResultFromMessage(data));

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function sound() {
        return _sound.apply(this, arguments);
      }

      return sound;
    }()
    /**
     * Prompts the user to upload a video. Use this method when you want to limit the user to uploading a video file.
     *
     * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
     *
     * @param   options
     * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the video asset as a string.
     * @return          URL to the video asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
     *
     * @example
     * ```javascript
     * const video = await Koji.ui.capture.video();
     *
     * // Transcode for HLS and return an object
     * const video = await Koji.ui.capture.video({ hls: true, verbose: true });
     * ```
     */

  }, {
    key: "video",
    value: function () {
      var _video = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var options,
            verbose,
            data,
            _args10 = arguments;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                options = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
                verbose = _args10.length > 1 ? _args10[1] : undefined;
                _context10.next = 4;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'video',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 4:
                data = _context10.sent;

                if (!verbose) {
                  _context10.next = 7;
                  break;
                }

                return _context10.abrupt("return", this.pickVerboseResultFromMessage(data));

              case 7:
                return _context10.abrupt("return", this.pickResultFromMessage(data));

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function video() {
        return _video.apply(this, arguments);
      }

      return video;
    }()
  }]);
  return Capture;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "color", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "color"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "custom", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "custom"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "file", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "file"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "image", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "image"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "link", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "link"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "media", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "media"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "range", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "range"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "select", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "select"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "sound", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "sound"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "video", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "video"), _class.prototype)), _class);
exports.Capture = Capture;
var capture = new Capture();
exports.capture = capture;
//# sourceMappingURL=index.js.map