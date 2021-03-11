"use strict";

var _index = require("./index");

describe('backend/base', function () {
  it('throws an error if a response object is supplied without passing through the middleware', function () {
    expect(function () {
      // @ts-ignore
      (0, _index.generateConfig)({
        res: {}
      });
    }).toThrow('The res.locals object is missing your project information. Have you implemented KojiBackend.middleware correctly?');
  });
  it('passes project details correctly from a res that has passed through the middleware', function () {
    var _generateConfig = (0, _index.generateConfig)({
      // @ts-ignore
      res: {
        locals: {
          KOJI_PROJECT_ID: 'testId',
          KOJI_PROJECT_TOKEN: 'testToken'
        }
      }
    }),
        projectId = _generateConfig.projectId,
        projectToken = _generateConfig.projectToken;

    expect(projectId).toBe('testId');
    expect(projectToken).toBe('testToken');
  });
  it('throws an error if there is no response object and project details are not explicitly passed', function () {
    expect(function () {
      (0, _index.generateConfig)({});
    }).toThrow('Unable to find project details');
  });
  it('passes project details correctly from explicitly passed parameters', function () {
    var _generateConfig2 = (0, _index.generateConfig)({
      projectId: 'testId',
      projectToken: 'testToken'
    }),
        projectId = _generateConfig2.projectId,
        projectToken = _generateConfig2.projectToken;

    expect(projectId).toBe('testId');
    expect(projectToken).toBe('testToken');
  });
});
//# sourceMappingURL=index.spec.js.map