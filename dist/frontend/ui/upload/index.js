"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.Upload = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
 * Uploads files from the frontend of your Koji app directly to your project's CDN.
 */
var Upload = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Upload, _KojiBridge);

  var _super = _createSuper(Upload);

  function Upload() {
    (0, _classCallCheck2["default"])(this, Upload);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Upload, [{
    key: "uploadFile",

    /**
     * Uploads a file to your project’s CDN.
     * Use this method to provide a custom upload experience or to upload media created or captured during the app experience.
     * For example, recording a video or drawing on a canvas.
     *
     * To upload files with the standard platform control, use {@doclink core-frontend-ui-capture#file | Capture.file }.
     *
     * NOTE: To use this method for uploading a file collected by a file input, you must extract the blob and reconstruct the file.
     * Browser sandboxing will not allow the native file to be transferred.
     *
     * @param   options     Request options for the file upload.
     *
     * @return              Unique URL for accessing the file on `images.koji-cdn.com` or `objects.koji-cdn.com`, depending on the type of file.
     *
     * @example
     * ```javascript
     * const url = await Koji.ui.upload.uploadFile({
     *  file: new File([blob], 'video.webm'),
     *  type: 'video',
     *  videoOptions: {
     *    hls: true,
     *  }
     * });
     * ```
     */
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Upload',
                  data: {
                    file: options.file,
                    type: options.type,
                    videoOptions: options.videoOptions
                  }
                }, 'Koji.UploadComplete');

              case 2:
                data = _context.sent;
                return _context.abrupt("return", data.result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadFile(_x) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }]);
  return Upload;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "uploadFile", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "uploadFile"), _class.prototype)), _class);
exports.Upload = Upload;
var upload = new Upload();
exports.upload = upload;
//# sourceMappingURL=index.js.map