"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3 = exports.Web3 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ethereum = require("./providers/ethereum");

/**
 * Provides interfaces for web3 dApps.
 */
var Web3 = function Web3() {
  (0, _classCallCheck2["default"])(this, Web3);
  (0, _defineProperty2["default"])(this, "providers", {
    ethereum: _ethereum.ethereumProvider
  });
};

exports.Web3 = Web3;
var web3 = new Web3();
exports.web3 = web3;
//# sourceMappingURL=index.js.map