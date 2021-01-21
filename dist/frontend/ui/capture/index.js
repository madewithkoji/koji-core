"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capture = exports.Capture = void 0;

var _bridge = require("../../bridge");

var _client = require("../../@decorators/client");

var _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Capture = (_class = /*#__PURE__*/function (_KojiBridge) {
  _inherits(Capture, _KojiBridge);

  var _super = _createSuper(Capture);

  function Capture() {
    _classCallCheck(this, Capture);

    return _super.apply(this, arguments);
  }

  _createClass(Capture, [{
    key: "color",
    value: function () {
      var _color = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options,
            data,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _file = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var options,
            data,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      var _image = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var options,
            data,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      var _koji = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var options,
            data,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
      var _media = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var options,
            data,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
      var _range = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var options,
            data,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
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
      var _select = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var options,
            data,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
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
      var _sound = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var options,
            data,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
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
      var _video = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var options,
            data,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
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
}(_bridge.KojiBridge), (_applyDecoratedDescriptor(_class.prototype, "color", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "color"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "file", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "file"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "image", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "image"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "koji", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "koji"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "media", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "media"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "range", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "range"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "select", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "select"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "sound", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "sound"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "video", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "video"), _class.prototype)), _class);
exports.Capture = Capture;
var capture = new Capture();
exports.capture = capture;
//# sourceMappingURL=index.js.map