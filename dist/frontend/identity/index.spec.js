"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("./index");

/**
 * @jest-environment jsdom
 */
// @ts-ignore
//
// Need to set a timeout so that we can await the return value from
// a listener.
function mockMessage(message) {
  window.setTimeout(function () {
    window.postMessage(message, '*');
  }, 0);
}

describe('frontend/identify', function () {
  var USER_TOKEN = 'testUserToken';
  it('returns a user token', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var userToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mockMessage({
              event: 'KojiAuth.TokenCreated',
              token: USER_TOKEN
            });
            _context.next = 3;
            return _index.identity.getToken();

          case 3:
            userToken = _context.sent;
            expect(userToken).toBe(USER_TOKEN);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=index.spec.js.map