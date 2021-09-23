"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3 = void 0;

var _ethereum = require("./providers/ethereum");

/**
 * Provides interfaces for web3 dApps.
 */
var Web3 = {
  ethereum: _ethereum.EthereumProvider
};
exports.Web3 = Web3;
//# sourceMappingURL=index.js.map