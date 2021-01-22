"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capture = exports.Capture = void 0;

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

var Capture = (_class = /*#__PURE__*/function (_KojiBridge) {
  (0, _inherits2["default"])(Capture, _KojiBridge);

  var _super = _createSuper(Capture);

  function Capture() {
    (0, _classCallCheck2["default"])(this, Capture);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Capture, [{
    key: "color",
    value: function () {
      var _color = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var options,
            data,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'color',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context.sent;

                if (!options.verbose) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", data);

              case 6:
                return _context.abrupt("return", data.result);

              case 7:
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
  }, {
    key: "file",
    value: function () {
      var _file = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options,
            data,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'file',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context2.sent;

                if (!options.verbose) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", data);

              case 6:
                return _context2.abrupt("return", data.result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function file() {
        return _file.apply(this, arguments);
      }

      return file;
    }()
  }, {
    key: "image",
    value: function () {
      var _image = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var options,
            data,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                _context3.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'image',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context3.sent;

                if (!options.verbose) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", data);

              case 6:
                return _context3.abrupt("return", data.result);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function image() {
        return _image.apply(this, arguments);
      }

      return image;
    }()
  }, {
    key: "koji",
    value: function () {
      var _koji = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var options,
            data,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'koji',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context4.sent;

                if (!options.verbose) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", data);

              case 6:
                return _context4.abrupt("return", data.result);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function koji() {
        return _koji.apply(this, arguments);
      }

      return koji;
    }()
  }, {
    key: "media",
    value: function () {
      var _media = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var options,
            data,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'media',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context5.sent;

                if (!options.verbose) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", data);

              case 6:
                return _context5.abrupt("return", data.result);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function media() {
        return _media.apply(this, arguments);
      }

      return media;
    }()
  }, {
    key: "range",
    value: function () {
      var _range = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var options,
            data,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                _context6.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'range',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context6.sent;

                if (!options.verbose) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", data);

              case 6:
                return _context6.abrupt("return", data.result);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function range() {
        return _range.apply(this, arguments);
      }

      return range;
    }()
  }, {
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var options,
            data,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'select',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context7.sent;

                if (!options.verbose) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", data);

              case 6:
                return _context7.abrupt("return", data.result);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function select() {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "sound",
    value: function () {
      var _sound = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var options,
            data,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'sound',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context8.sent;

                if (!options.verbose) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", data);

              case 6:
                return _context8.abrupt("return", data.result);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function sound() {
        return _sound.apply(this, arguments);
      }

      return sound;
    }()
  }, {
    key: "video",
    value: function () {
      var _video = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var options,
            data,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
                _context9.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: 'Koji.Capture',
                  data: {
                    type: 'video',
                    options: options
                  }
                }, 'Koji.CaptureSuccess');

              case 3:
                data = _context9.sent;

                if (!options.verbose) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", data);

              case 6:
                return _context9.abrupt("return", data.result);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function video() {
        return _video.apply(this, arguments);
      }

      return video;
    }()
  }]);
  return Capture;
}(_kojiBridge.KojiBridge), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "color", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "color"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "file", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "file"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "image", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "image"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "koji", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "koji"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "media", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "media"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "range", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "range"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "select", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "select"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "sound", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "sound"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "video", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "video"), _class.prototype)), _class);
exports.Capture = Capture;
var capture = new Capture();
exports.capture = capture;
//# sourceMappingURL=index.js.map