import { analytics, IAnalytics } from './analytics';
import { iap, IIAP } from './iap';
import { remix, IRemix } from './remix';

class Koji {
  projectId?: string;
  projectToken?: string;

  isReady: boolean;

  analytics: IAnalytics;
  iap: IIAP;
  remix: IRemix;

  constructor() {
    this.isReady = false;

    this.projectId = process.env.KOJI_PROJECT_ID;
    this.projectToken = process.env.KOJI_PROJECT_TOKEN;

    this.analytics = analytics;
    this.iap = iap;
    this.remix = remix;
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
