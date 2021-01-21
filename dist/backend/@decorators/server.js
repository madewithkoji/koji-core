"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = server;

/* eslint-disable no-param-reassign */
function server(target, propertyKey, descriptor) {
  var originalFunction = descriptor.value;

  descriptor.value = function serverDecorator() {
    try {
      if (typeof window !== 'undefined') throw new Error('It looks like you are trying to call a server-side method on the client.');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return originalFunction.apply(this, args);
    } catch (err) {
      console.error("Err: ".concat(err.toString()));
    }

    return false;
  };

  return descriptor;
}
//# sourceMappingURL=server.js.map