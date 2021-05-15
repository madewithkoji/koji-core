/* eslint-disable no-underscore-dangle */
import { analytics, Analytics } from './analytics';
import { dispatch, Dispatch } from './dispatch';
import { iap, IAP } from './iap';
import { identity, Identity } from './identity';
import { playerState, PlayerState } from './playerState';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';
import { client } from './@decorators/client';
import { equalsIgnoreOrder } from '../utils/equalsIgnoreOrder';

import { KojiConfig } from '../model/KojiConfig';
import { KojiConfigOptions } from '../model/KojiConfigOptions';
import { KojiMetadata } from '../model/KojiMetadata';
import { Services } from '../types/Services';

/**
 * Provides frontend methods for your Koji.
 */
export class Koji {
  /** Indicates that the Koji.ready() call has been made. */
  public isReady: boolean;

  /** Indicates that the Koji.config() call has been made. */
  public configInitialized: boolean = false;

  /** The configured service endpoints. */
  public services: Services = {};

  /** The project's id. */
  public projectId?: string;

  /** Metadata about the project and creator. */
  public metadata?: KojiMetadata;

  public analytics: Analytics = analytics;
  public dispatch: Dispatch = dispatch;
  public iap: IAP = iap;
  public identity: Identity = identity;
  public playerState: PlayerState = playerState;
  public remix: Remix = remix;
  public ui: UI = ui;

  constructor() {
    this.isReady = false;
  }

  /**
   * Initializes this package for use with configuration data from the `koji.json` file. This method sets up the services, remix values, development environment, and deployment instructions for your Koji template. It also performs some basic structural checks.
   *
   * NOTE: A template should initialize the package one time, before any data in the application is rendered.
   *
   * @param kojiConfig Configuration data for the Koji.
   *
   * @example
   * ```
   * Koji.config(require('koji.json'));
   * ```
   */
  public config(
    kojiConfig: KojiConfig = {},
    kojiConfigOptions: KojiConfigOptions = {
      services: {},
    },
  ): void {
    if (this.configInitialized) {
      throw new Error(
        'You are trying to run `Koji.config()` more than one time. This could cause unexpected behavior in your project.',
      );
    }

    // Pull the `koji-feed-key` off the URL fragment, if it exists, and save it
    // to the window so we can grab it if the URL changes due to navigation
    // events.
    if (!window.KOJI_FEED_KEY) {
      const feedKey = window.location.hash.replace('#koji-feed-key=', '');
      if (feedKey) {
        window.KOJI_FEED_KEY = feedKey;
      }
    }

    // Deconstruct the user's config
    const { develop = {}, deploy = {}, remixData = {} } = kojiConfig;

    // Check for the project id
    this.resolveMetadata(
      kojiConfigOptions.projectId,
      kojiConfigOptions.metadata,
    );

    // Set up and sanity check services
    this.resolveServices(develop, deploy, kojiConfigOptions.services);

    // Initialize remix data
    this.remix.init(remixData);
  }

  private resolveMetadata(explicitProjectId?: string, metadata?: KojiMetadata) {
    let projectId = explicitProjectId || process.env.KOJI_PROJECT_ID;
    let creatorUsername = process.env.KOJI_CREATOR_USERNAME;
    let creatorProfilePicture = process.env.KOJI_CREATOR_PROFILE_PICTURE;

    if (metadata) {
      creatorUsername = metadata.creatorUsername;
      creatorProfilePicture = metadata.creatorProfilePicture;
    }

    // Even if the value is overwritten by an override, it should still
    // be defined at this point.
    if (!projectId) {
      throw new Error('Unable to find project id.');
    }

    // Handle overrides
    if (window.KOJI_OVERRIDES) {
      const { overrides = {} } = window.KOJI_OVERRIDES;

      if (overrides && overrides.metadata) {
        projectId = overrides.metadata.projectId;
        creatorUsername = overrides.metadata.creatorUsername;
        creatorProfilePicture = overrides.metadata.creatorProfilePicture;
      }
    }

    // Set local projectId
    this.projectId = projectId;

    // Set the metadata
    this.metadata = {
      projectId: projectId || '',
      creatorUsername: creatorUsername || '',
      creatorProfilePicture: creatorProfilePicture || '',
    };

    // Init dispatch
    this.dispatch?.setProjectId(projectId as string);
  }

  private resolveServices(develop: Object, deploy: Object, services: Services) {
    const developServices = Object.keys(develop);
    const deployServices = Object.keys(deploy);

    // Require at least one deploy service to be defined
    if (deployServices.length === 0) {
      throw new Error(
        'Your configuration does not include any services for deployment',
      );
    }

    // Require at least one develop service to be defined
    if (developServices.length === 0) {
      throw new Error(
        'Your configuration does not include any services for development',
      );
    }

    // Require the develop and deploy services to match
    if (!equalsIgnoreOrder(deployServices, developServices)) {
      throw new Error('Your develop and deploy services do not match');
    }

    // Create the base service map and look for env vars we know to exist
    const baseServiceMap: Services = {};
    deployServices.forEach((serviceName) => {
      baseServiceMap[serviceName] =
        process.env[`KOJI_SERVICE_URL_${serviceName}`];
    });

    // If the user has explicitly passed in values, use those instead
    Object.keys(services).forEach((serviceName) => {
      if (services[serviceName]) {
        baseServiceMap[serviceName] = services[serviceName];
      }
    });

    // Require a value for each service
    Object.keys(baseServiceMap).forEach((serviceName) => {
      if (!baseServiceMap[serviceName]) {
        throw new Error(
          `Unable to find a value for the ${serviceName} service. If your value is not available at \`process.env.KOJI_SERVICE_URL_${serviceName}\`, you may need to pass it explicitly using the second, kojiConfigOptions parameter when calling Koji.config`,
        );
      }
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

  private addClickListeners() {
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
              _feedKey: window.KOJI_FEED_KEY,
              x: clientX,
              y: clientY,
            },
            '*',
          );
        } catch (err) {
          //
        }
      },
      {
        capture: true,
        passive: true,
      },
    );
  }

  private addContextPassthroughListeners() {
    window.addEventListener('message', ({ data, origin }) => {
      // Handle passthrough of messages from any Kojis inside this Koji
      if (data._type === 'Koji.ContextPassthrough.Up') {
        try {
          // Mutate the source map to add the context
          if (window.parent) {
            window.parent.postMessage(
              {
                ...data,
                _path: [origin, ...(data._path || [])],
              },
              '*',
            );
          }
        } catch (err) {
          //
        }
      }

      if (data._type === 'Koji.ContextPassthrough.Down') {
        try {
          const destinationOrigin = data._path[0];
          const frame: HTMLIFrameElement | undefined = Array.from(
            document.getElementsByTagName('iframe'),
          ).find(({ src }) => src.startsWith(destinationOrigin));

          if (frame && frame.contentWindow) {
            if (data._path.length === 0) {
              frame.contentWindow.postMessage(
                {
                  ...data.originalMessage,
                },
                '*',
              );
            } else {
              frame.contentWindow.postMessage(
                {
                  ...data,
                  _path: data._path.slice(1),
                },
                '*',
              );
            }
          }
        } catch (err) {
          // console.log(err);
        }
      }
    });
  }

  /**
   * Indicates that the Koji is ready to start receiving events.
   *
   * NOTE: You must call this function after initializing the package and subscribing to remix state changes, but before advancing to the preview with `Koji.remix.finish`.
   *
   * @example
   * ```javascript
   * Koji.ready();
   * ```
   */
  @client
  public ready() {
    if (this.isReady) {
      throw new Error(
        'You are calling `Koji.ready()` more than one time. This could cause unexpected behavior in your project.',
      );
    }

    this.isReady = true;

    // Add click listeners to bubble up click events to the platform
    this.addClickListeners();

    // Add context passthrough listeners to allow messages to bubble up/down between layered Kojis
    this.addContextPassthroughListeners();

    // Send the ready message, letting the platform know it's okay
    // to release any queued messages
    window.parent.postMessage(
      {
        _type: 'KojiPreview.Ready',
        _feedKey: window.KOJI_FEED_KEY,
      },
      '*',
    );
  }
}

export default new Koji();
