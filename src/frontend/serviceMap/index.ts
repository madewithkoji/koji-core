export type Services = { [key: string]: string; };

/**
 * Manages endpoints for the services running in your Koji.
 */
export class ServiceMap {
  /** Key-value pairs of services and endpoints. */
  public services: Services = {};

  /**
   * Sets the environment variables for the available services in the Koji. This method automatically scopes the variables for instant remixes of the original Koji.
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
  public config(envMap: Services = {}): void {
    if (Object.keys(envMap).length === 0) throw new Error('Please add some base services');

    // Handle overrides
    if (window.KOJI_OVERRIDES) {
      const { overrides = {} } = window.KOJI_OVERRIDES;
      if (overrides && overrides.serviceMap) {
        this.services = {
          ...envMap,
          ...overrides.serviceMap,
        };
        return;
      }
    }

    // If no overrides, return the original map
    this.services = { ...envMap };
  }
}

export const serviceMap = new ServiceMap();
