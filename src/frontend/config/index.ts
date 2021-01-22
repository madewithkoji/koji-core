import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

export interface ServiceMap {
  [index: string]: any;
}

export class Config extends KojiBridge {
  serviceMap: ServiceMap = {};

  constructor() {
    super();

    this.serviceMap = Object.keys(process.env).reduce((services: { [index: string]: any }, envVariable) => {
      if (envVariable.startsWith('KOJI_SERVICE_URL')) {
        return {
          ...services,
          [services[envVariable.replace('KOJI_SERVICE_URL_', '').toLowerCase()]]: process.env[envVariable],
        };
      }
      return services;
    }, {});
  }

  @client
  load() {

  }
}

export const config = new Config();
