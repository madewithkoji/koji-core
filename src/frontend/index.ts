import { analytics, Analytics } from './analytics';
import { iap, IAP } from './iap';
import { identity, Identity } from './identity';
import { playerState, PlayerState } from './playerState';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';
import { client } from './@decorators/client';
import { equalsIgnoreOrder } from '../utils/equalsIgnoreOrder';

export interface KojiConfig {
  develop?: any;
  deploy?: any;
  remixData?: any;
  '@@initialTransform'?: any;
}

export type Services = { [key: string]: string | undefined };

export interface KojiConfigOptions {
  services: Services;
}

export class Koji {
  isReady: boolean;
  configInitialized: boolean = false;
  services: Services = {};

  analytics: Analytics = analytics;
  iap: IAP = iap;
  identity: Identity = identity;
  playerState: PlayerState = playerState;
  remix: Remix = remix;
  ui: UI = ui;

  constructor() {
    this.isReady = false;
  }

  /**
   * Prepare this package for use by passing in the data from your koji.json
   * file. In addition to setting up things like your serviceMap and remix values,
   * this function will also do some basic structural checks.
   * @param {Object} kojiConfig Your Koji configuration object (e.g., require('./koji.json'))
   * @param {Object} kojiConfig.develop Instructions to set up the development/editor environment for your services
   * @param {Object} kojiConfig.deploy Instructions to deploy your services to production
   * @param {Object} kojiConfig.remixData The base values for your customizable remix data
   * @param {Object} kojiConfig.['@@initialTransform'] The values that will be loaded for new remixes
   */
  public config(kojiConfig: KojiConfig = {}, kojiConfigOptions: KojiConfigOptions = { services: {} }): void {
    if (this.configInitialized) {
      console.warn('You are trying to run config more than one time. The previous configuration options will not be overwritten but this could indicate unexpected behavior in your project.');
      return;
    }

    const { develop = {}, deploy = {}, remixData = {} } = kojiConfig;

    const developServices = Object.keys(develop);
    const deployServices = Object.keys(deploy);

    // Require at least one deploy service to be defined
    if (deployServices.length === 0) throw new Error('Your configuration does not include any services for');

    // Require at least one develop service to be defined
    if (developServices.length === 0) throw new Error('Your configuration does not include any services for development');

    // Require the develop and deploy services to match
    if (!equalsIgnoreOrder(deployServices, developServices)) throw new Error('Your develop and deploy services do not match');

    // Create the base service map and look for env vars we know to exist
    const baseServiceMap: Services = {};
    deployServices.forEach((serviceName) => {
      baseServiceMap[serviceName] = process.env[`KOJI_SERVICE_URL_${serviceName}`];
    });

    // If the user has explicitly passed in values, use those instead
    Object.keys(kojiConfigOptions.services).forEach((serviceName) => {
      if (kojiConfigOptions.services[serviceName]) {
        baseServiceMap[serviceName] = kojiConfigOptions.services[serviceName];
      }
    });

    // Require a value for each service
    Object.keys(baseServiceMap).forEach((serviceName) => {
      if (!baseServiceMap[serviceName]) throw new Error(`Unable to find a value for the ${serviceName} service. If your value is not available at \`process.env.KOJI_SERVICE_URL_${serviceName}\`, you may need to pass it explicitly using the second, kojiConfigOptions parameter when calling Koji.config`);
    });

    // Handle overrides
    if (window.KOJI_OVERRIDES) {
      const { overrides = {} } = window.KOJI_OVERRIDES;
      if (overrides && overrides.serviceMap) {
        this.services = {
          ...baseServiceMap,
          ...overrides.serviceMap,
        };
      }
    } else {
      this.services = { ...baseServiceMap };
    }

    // Initialize remix data
    this.remix.init(remixData);
  }

  @client
  ready() {
    this.isReady = true;

    // Add a listener to pass click events up to the parent window,
    // as there is no way for the platform to know these clicks are
    // happening due to iframe constraints
    window.addEventListener(
      'click',
      (e) => {
        try {
          const { clientX, clientY } = e;
          window.parent.postMessage(
            {
              _type: 'Koji.ClickEvent',
              _feedKey: window.location.hash.replace('#koji-feed-key=', ''),
              x: clientX,
              y: clientY,
            },
            '*',
          );
        } catch (err) {
          //
        }
      },
      { capture: true, passive: true },
    );

    // Send the ready message, letting the platform know it's okay
    // to release any queued messages
    window.parent.postMessage(
      {
        _type: 'KojiPreview.Ready',
      },
      '*',
    );
  }
}

export default new Koji();
