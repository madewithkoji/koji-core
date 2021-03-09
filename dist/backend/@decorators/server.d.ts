/**
 * Verifies that server-side methods are used only in backend services of the Koji.
 * @param   target      Class to which the method belongs.
 * @param   propertyKey Method name.
 * @param   descriptor  Method's behavior (which can be mutated inside this function).
 * @return              Method's behavior or an error, if the method is being invoked in a frontend environment.
 */
export declare function server(target: Object, propertyKey: string, descriptor: PropertyDescriptor): any;
