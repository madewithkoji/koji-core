/** Key-value pairs of services and endpoints. */
export declare type Services = {
    [key: string]: string;
};
/**
 * Manages endpoints for the services running in your Koji app.
 */
export declare class ServiceMap {
    /** Key-value pairs of services and endpoints. */
    services: Services;
    /**
     * Sets the environment variables for the available services in the Koji app. This method automatically scopes the variables for the customized version of the Koji app.
     *
     * @param   envMap Key-value pairs of services and endpoints in the original Koji.
     *
     * @example
     * ```javascript
     * Koji.serviceMap.config({
     *  frontend: process.env.KOJI_SERVICE_URL_frontend
     * });
     * ```
     */
    config(envMap?: Services): void;
}
export declare const serviceMap: ServiceMap;
