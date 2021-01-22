import { analytics, Analytics } from './analytics';
import { iap, IAP } from './iap';
import { config, Config } from './config';
import { identity, Identity } from './identity';
import { playerState, PlayerState } from './playerState';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';
import { client } from './@decorators/client';

class Koji {
  projectId?: string;
  projectToken?: string;

  isReady: boolean;

  analytics: Analytics = analytics;
  config: Config = config;
  iap: IAP = iap;
  identity: Identity = identity;
  playerState: PlayerState = playerState;
  remix: Remix = remix;
  ui: UI = ui;

  constructor() {
    this.isReady = false;

    this.projectId = process.env.KOJI_PROJECT_ID;
    this.projectToken = process.env.KOJI_PROJECT_TOKEN;
  }

  @client
  ready() {
    this.isReady = true;

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

    window.parent.postMessage(
      {
        _type: 'KojiPreview.Ready',
      },
      '*',
    );
  }

  setProjectValues(id: string, token: string) {
    this.projectId = id;
    this.projectToken = token;
  }

  getProjectValues() {
    return {
      projectId: this.projectId,
      projectToken: this.projectToken,
    };
  }
}

export default new Koji();
