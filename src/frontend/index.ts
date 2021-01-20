import { analytics, Analytics } from './analytics';
import { iap, IAP } from './iap';
import { identity, Identity } from './identity';
import { remix, Remix } from './remix';
import { ui, UI } from './ui';

class Koji {
  projectId?: string;
  projectToken?: string;

  isReady: boolean;

  analytics: Analytics = analytics;
  iap: IAP = iap;
  identity: Identity = identity;
  remix: Remix = remix;
  ui: UI = ui;

  constructor() {
    this.isReady = false;

    this.projectId = process.env.KOJI_PROJECT_ID;
    this.projectToken = process.env.KOJI_PROJECT_TOKEN;
  }

  ready() {
    this.isReady = true;

    if (window.parent) {
      window.parent.postMessage(
        {
          _type: 'KojiPreview.Ready',
        },
        '*',
      );
    }
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
