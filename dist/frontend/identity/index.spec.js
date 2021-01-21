"use strict";

var _index = require("./index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  it('returns a user token', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var userToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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