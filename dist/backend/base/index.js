"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateConfig = generateConfig;
exports.Base = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Extensibly generate a project configuration
 * @param config Information about the project
 * @param config.projectId The projectId (This will override data passed through res)
 * @param config.projectToken The projectToken (This will override data passed through res)
 * @param config.res An express response object (Used in conjunction with KojiBackend.middleware)
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
  _classCallCheck(this, Base);

  _defineProperty(this, "projectId", void 0);

  _defineProperty(this, "projectToken", void 0);

  var _generateConfig = generateConfig(config),
      projectId = _generateConfig.projectId,
      projectToken = _generateConfig.projectToken;

  this.projectId = projectId;
  this.projectToken = projectToken;
};

exports.Base = Base;
//# sourceMappingURL=index.js.map