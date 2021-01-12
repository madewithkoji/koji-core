/* eslint-disable no-param-reassign */
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
