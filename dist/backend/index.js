"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KojiBackend = void 0;

var _iap = require("./iap");

var _middleware = require("./middleware");

var _database = require("./database");

var _dispatch = require("./dispatch");

var _identity = require("./identity");

var _secret = require("./secret");

var _utilities = require("./utilities");

var _web = require("./web3");

/**
 * Provides backend methods for your Koji app.
 */
var KojiBackend = {
  Database: _database.Database,
  IAP: _iap.IAP,
  Dispatch: _dispatch.Dispatch,
  Identity: _identity.Identity,
  Secret: _secret.Secret,
  Utilities: _utilities.Utilities,
  Web3: _web.Web3,
  middleware: _middleware.middleware
};
exports.KojiBackend = KojiBackend;
//# sourceMappingURL=index.js.map