"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = client;

/* eslint-disable no-param-reassign */
function client(target, propertyKey, descriptor) {
  var originalFunction = descriptor.value;

  descriptor.value = function clientDecorator() {
    try {
      if (!window) throw new Error('It looks like you are trying to call a client-side method on the server.');

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
//# sourceMappingURL=client.js.map