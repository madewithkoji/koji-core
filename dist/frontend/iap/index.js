"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iap = exports.IAP = void 0;

var _bridge = require("../bridge");

var _client = require("../@decorators/client");

var _class, _temp;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var IAP = (_class = (_temp = /*#__PURE__*/function (_KojiBridge) {
  _inherits(IAP, _KojiBridge);

  var _super = _createSuper(IAP);

  function IAP() {
    var _this;

    _classCallCheck(this, IAP);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "purchaseCallback", void 0);

    return _this;
  }

  _createClass(IAP, [{
    key: "register",
    value: function register() {
      var _this2 = this;

      window.addEventListener('message', function (_ref) {
        var data = _ref.data;
        var event = data.event;

        if (event === 'KojiIap.PurchaseFinished') {
          if (!_this2.purchaseCallback) throw new Error('Received purchase information but no purchase has been started');

          _this2.purchaseCallback(data.success, data.userToken, data.receiptId);

          _this2.purchaseCallback = undefined;
        }
      });
    }
  }, {
    key: "startPurchase",
    value: function () {
      var _startPurchase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sku) {
        var purchaseOptions,
            _yield$this$sendMessa,
            success,
            userToken,
            receiptId,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                purchaseOptions = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.next = 3;
                return this.sendMessageAndAwaitResponse({
                  kojiEventName: '@@koji/iap/promptPurchase',
                  data: {
                    sku: sku,
                    purchaseOptions: purchaseOptions
                  }
                }, 'KojiIap.PurchaseFinished');

              case 3:
                _yield$this$sendMessa = _context.sent;
                success = _yield$this$sendMessa.success;
                userToken = _yield$this$sendMessa.userToken;
                receiptId = _yield$this$sendMessa.receiptId;
                return _context.abrupt("return", {
                  success: success,
                  userToken: userToken,
                  receiptId: receiptId
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function startPurchase(_x) {
        return _startPurchase.apply(this, arguments);
      }

      return startPurchase;
    }()
  }]);

  return IAP;
}(_bridge.KojiBridge), _temp), (_applyDecoratedDescriptor(_class.prototype, "startPurchase", [_client.client], Object.getOwnPropertyDescriptor(_class.prototype, "startPurchase"), _class.prototype)), _class);
exports.IAP = IAP;
var iap = new IAP();
exports.iap = iap;
//# sourceMappingURL=index.js.map