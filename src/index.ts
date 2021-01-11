import Remix, { IRemix } from './remix/index';

class Koji {
  isReady: boolean;

  remix: IRemix;

  constructor() {
    this.isReady = false;

    this.remix = new Remix();
  }

  ready() {
    this.remix.register();

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
}

export default new Koji();
