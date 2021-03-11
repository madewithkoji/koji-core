"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = middleware;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

// ToDo: Make this non-mutating
var decodeObject = function decodeObject(obj) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] && (0, _typeof2["default"])(obj[key]) === 'object') {
      decodeObject(obj[key]);
      return;
    } // eslint-disable-next-line no-param-reassign


    obj[key] = decodeURI(obj[key]);
  });
};
/**
 * Executes middleware, making koji-specific data available on the res.locals property.
 *
 * @param kojiConfig Configuration data for the Koji.
 *
 * @example
 * ```
 * app.use(Koji.middleware(require('koji.json'));
 * ```
 */


function middleware() {
  var kojiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function kojiMiddleware(req, res, next) {
    // Explicitly pass the project id and token that are coming in from proxied headers
    res.locals.KOJI_PROJECT_ID = req.headers['x-trusted-koji-project-id'] || process.env.KOJI_PROJECT_ID;
    res.locals.KOJI_PROJECT_TOKEN = req.headers['x-trusted-koji-project-token'] || process.env.KOJI_PROJECT_TOKEN; // Use the remixData from the json configuration as the base

    var _kojiConfig$remixData = kojiConfig.remixData,
        remixData = _kojiConfig$remixData === void 0 ? {} : _kojiConfig$remixData; // Apply remix-specific overrides (equivalent of window.KOJI_OVERRIDES.overrides on the client)

    var overrides = req.headers['x-trusted-koji-overrides'];
    var parsedOverrides = typeof overrides === 'string' ? JSON.parse(overrides) : {}; // Overrides coming from the headers are URL-encoded, so we need to decode them
    // before using them

    decodeObject(parsedOverrides); // Pull the remixData property from our overrides (which will include the entire koji.json contents)

    var _parsedOverrides$remi = parsedOverrides.remixData,
        remixDataOverride = _parsedOverrides$remi === void 0 ? {} : _parsedOverrides$remi;
    res.locals.remixData = (0, _deepmerge["default"])(remixData, remixDataOverride, {
      arrayMerge: function arrayMerge(dest, source) {
        return source;
      }
    });
    next();
  };
}
//# sourceMappingURL=index.js.map