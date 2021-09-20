/**
 * Verifies that client-side methods are used only in frontend services of the Koji app.
 *
 * @param   target      Class to which the method belongs.
 * @param   propertyKey Method name.
 * @param   descriptor  Method's behavior (which can be mutated inside this function).
 * @return              Method's behavior or an error, if the method is being invoked in a node/backend environment.
 */
export declare function client(target: Object, propertyKey: string, descriptor: PropertyDescriptor): any;
