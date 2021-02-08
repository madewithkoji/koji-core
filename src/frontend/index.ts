import { analytics, Analytics } from './analytics';
import { dispatch, Dispatch } from './dispatch';
import { iap, IAP } from './iap';
import { identity, Identity } from './identity';
import { playerState, PlayerState } from './playerState';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';
import { client } from './@decorators/client';
import { equalsIgnoreOrder } from '../utils/equalsIgnoreOrder';

/**
 * Defines the configuration data for the Koji.
 */
export interface KojiConfig {
  /** Instructions for setting up the services in a development/editor environment. */
  develop?: any;
  /** Instructions for deploying the services to production. */
  deploy?: any;
  /** Default values for the customizable remix data. */
  remixData?: any;
  /** Placeholder values for new remixes. */
  '@@initialTransform'?: any;
}

/**
 * Key-value pairs of services and endpoints.
 */
export type Services = { [key: string]: string | undefined };

/**
 * Configuration options for the Koji.
 */
export interface KojiConfigOptions {
  /** Unique identifier for the Koji. */
  projectId?: string;
  /** Defines services for the Koji. */
  services: Services;
}
/**
 * Provides frontend methods for your Koji.
 */
export class Koji {
  isReady: boolean;
  configInitialized: boolean = false;
  services: Services = {};
  projectId?: string;

  analytics: Analytics = analytics;
  dispatch: Dispatch = dispatch;
  iap: IAP = iap;
  identity: Identity = identity;
  playerState: PlayerState = playerState;
  remix: Remix = remix;
  ui: UI = ui;

  constructor() {
    this.isReady = false;
  }

  /**
   * Initializes this package for use with configuration data from the `koji.json` file. This method sets up the services, remix values, development environment, and deployment instructions for your Koji. It also performs some basic structural checks.
   *
   * @param kojiConfig Configuration data for the Koji.
   *
   * @example
   * ```
   * Koji.config(require('koji.json'));
   * ```
   */
  public config(kojiConfig: KojiConfig = {}, kojiConfigOptions: KojiConfigOptions = { services: {} }): void {
    if (this.configInitialized) {
      throw new Error('You are trying to run `Koji.config()` more than one time. This could cause unexpected behavior in your project.');
    }

    // Deconstruct the user's config
    const { develop = {}, deploy = {}, remixData = {} } = kojiConfig;

    // Check for the project id
    this.setProjectId(kojiConfigOptions.projectId);

    // Set up and sanity check services
    this.setUpServices(develop, deploy, kojiConfigOptions.services);

    // Initialize remix data
    this.remix.init(remixData);
  }

  private setProjectId(explicitProjectId?: string) {
    let projectId = explicitProjectId || process.env.KOJI_PROJECT_ID;

    // Even if the value is overwritten by an override, it should still
    // be defined at this point.
    if (!projectId) throw new Error('Unable to find project id.');

    // Handle overrides
    if (window.KOJI_OVERRIDES) {
      const { overrides = {} } = window.KOJI_OVERRIDES;
      if (overrides && overrides.metadata && overrides.metadata.projectId) {
        projectId = overrides.metadata.projectId;
      }
    }

    // Set local projectId
    this.projectId = projectId;

    // Init dispatch
    this.dispatch?.setProjectId(projectId as string);
  }

  private setUpServices(develop: Object, deploy: Object, services: Services) {
    const developServices = Object.keys(develop);
    const deployServices = Object.keys(deploy);

    // Require at least one deploy service to be defined
    if (deployServices.length === 0) throw new Error('Your configuration does not include any services for deployment');

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
    Object.keys(services).forEach((serviceName) => {
      if (services[serviceName]) {
        baseServiceMap[serviceName] = services[serviceName];
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
  }

  /**
   * Indicates that the Koji is ready to start receiving events.
   *
   * @example
   * ```javascript
   * Koji.ready
   * ```
   */
  @client
  ready() {
    if (this.isReady) {
      throw new Error('You are calling `Koji.ready()` more than one time. This could cause unexpected behavior in your project.');
    }

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
