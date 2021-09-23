"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateConfig = generateConfig;
exports.Base = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Configuration information for the Koji app.
 */

/**
 * Environment variables that serve as access credentials for the Koji app's backend services.
 */

/**
 * Generates an extensible configuration for the Koji app's backend services.
 *
 * @param config Configuration information for the Koji app.
 */
function generateConfig(config) {
  var projectId;
  var projectToken; // If the user is passing a response from express, we expect the project details to be written
  // to res.locals by the middleware.

  if (config.res) {
    var _ref = config.res.locals || {};

    projectId = _ref.KOJI_PROJECT_ID;
    projectToken = _ref.KOJI_PROJECT_TOKEN;

    if (!projectId || !projectToken) {
      throw new Error('The res.locals object is missing your project information. Have you implemented KojiBackend.middleware correctly?');
    }
  } // If the user is explicitly passing a projectId or projectToken, these values should override
  // other implementations


  projectId = config.projectId || projectId;
  projectToken = config.projectToken || projectToken;
  if (!projectId || !projectToken) throw new Error('Unable to find project details');
  return {
    projectId: projectId,
    projectToken: projectToken
  };
}

var Base = function Base(config) {
  (0, _classCallCheck2["default"])(this, Base);
  (0, _defineProperty2["default"])(this, "projectId", void 0);
  (0, _defineProperty2["default"])(this, "projectToken", void 0);

  var _generateConfig = generateConfig(config),
      projectId = _generateConfig.projectId,
      projectToken = _generateConfig.projectToken;

  this.projectId = projectId;
  this.projectToken = projectToken;
};

exports.Base = Base;
//# sourceMappingURL=index.js.map