class Koji {
  isReady: boolean;

  constructor() {
    this.isReady = false;
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
}

export default new Koji();
