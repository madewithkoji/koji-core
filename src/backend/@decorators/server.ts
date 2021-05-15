/* eslint-disable no-param-reassign */
/**
 * Verifies that server-side methods are used only in backend services of the Koji.
 *
 * @param   target      Class to which the method belongs.
 * @param   propertyKey Method name.
 * @param   descriptor  Method's behavior (which can be mutated inside this function).
 * @return              Method's behavior or an error, if the method is being invoked in a frontend environment.
 */
export function server(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): any {
  const originalFunction = descriptor.value;

  descriptor.value = function serverDecorator(...args: any[]) {
    try {
      if (typeof window !== 'undefined') {
        throw new Error(
          'It looks like you are trying to call a server-side method on the client.',
        );
      }

      return originalFunction.apply(this, args);
    } catch (err) {
      // console.error(`Err: ${err.toString()}`);
    }

    return false;
  };

  return descriptor;
}
