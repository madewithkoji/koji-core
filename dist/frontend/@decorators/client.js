"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = client;

/* eslint-disable no-param-reassign */

/**
 * Verifies that client-side methods are used only in frontend services of the Koji app.
 *
 * @param   target      Class to which the method belongs.
 * @param   propertyKey Method name.
 * @param   descriptor  Method's behavior (which can be mutated inside this function).
 * @return              Method's behavior or an error, if the method is being invoked in a node/backend environment.
 */
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