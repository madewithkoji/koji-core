/* eslint-disable no-param-reassign */
export function server(target: Object, propertyKey: string, descriptor: PropertyDescriptor): any {
  const originalFunction = descriptor.value;

  descriptor.value = function serverDecorator(...args: any[]) {
    try {
      if (typeof window !== 'undefined') throw new Error('It looks like you are trying to call a server-side method on the client.');

      return originalFunction.apply(this, args);
    } catch (err) {
      console.error(`Err: ${err.toString()}`);
    }

    return false;
  };

  return descriptor;
}
