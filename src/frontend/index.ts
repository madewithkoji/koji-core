import { analytics, Analytics } from './analytics';
import { iap, IAP } from './iap';
import { identity, Identity } from './identity';
import { playerState, PlayerState } from './playerState';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';
import { client } from './@decorators/client';

class Koji {
  isReady: boolean;

  analytics: Analytics = analytics;
  iap: IAP = iap;
  identity: Identity = identity;
  playerState: PlayerState = playerState;
  remix: Remix = remix;
  ui: UI = ui;

  constructor() {
    this.isReady = false;
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
}

export default new Koji();
