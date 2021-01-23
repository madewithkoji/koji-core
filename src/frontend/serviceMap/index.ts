export type Services = { [key: string]: string; };

export class ServiceMap {
  public services: Services = {};

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
