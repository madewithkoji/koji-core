export class ServiceMap {
  public get(envMap: Object = {}) {
    const services = Object.keys(envMap);

    console.log('s', services, envMap);

    if (!services || services.length === 0) throw new Error('Please add some base services');

    // Handle overrides
    if (window.KOJI_OVERRIDES) {
      const { overrides = {} } = window.KOJI_OVERRIDES;
      if (overrides && overrides.serviceMap) {
        return {
          ...envMap,
          ...overrides.serviceMap,
        };
      }
    }

    // If no overrides, return the original map
    return { ...envMap };
  }
}

export const serviceMap = new ServiceMap();
