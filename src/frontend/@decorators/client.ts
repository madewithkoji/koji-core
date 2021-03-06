/* eslint-disable no-param-reassign */
/**
 * Verifies that client-side methods are used only in frontend services of the Koji app.
 *
 * @param   target      Class to which the method belongs.
 * @param   propertyKey Method name.
 * @param   descriptor  Method's behavior (which can be mutated inside this function).
 * @return              Method's behavior or an error, if the method is being invoked in a node/backend environment.
 */
export function client(target: Object, propertyKey: string, descriptor: PropertyDescriptor): any {
  const originalFunction = descriptor.value;

  descriptor.value = function clientDecorator(...args: any[]) {
    try {
      if (!window) throw new Error('It looks like you are trying to call a client-side method on the server.');

      return originalFunction.apply(this, args);
    } catch (err) {
      console.error(`Err: ${err.toString()}`);
    }

    return false;
  };

  return descriptor;
}
