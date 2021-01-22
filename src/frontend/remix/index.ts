import deepmerge from 'deepmerge';
import { client } from '../@decorators/client';
import { KojiBridge } from '../kojiBridge';

declare global {
  interface Window {
    KOJI_OVERRIDES: any;
  }
}

export class Remix extends KojiBridge {
  private values: any = {};
  private isInitialized: boolean = false;

  @client
  init(initialValues: Object) {
    if (this.isInitialized) {
      console.warn('You are trying to initialize your remix data more than one time.');
      return;
    }

    this.isInitialized = true;

    let overrides = {};
    if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
      overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
    }

    this.values = deepmerge(initialValues, overrides, {
      arrayMerge: (dest, source) => source,
    });
  }

  @client
  get() {
    return this.values;
  }

  @client
  set(newValue: Object): void {
    this.values = deepmerge(this.values, newValue, {
      arrayMerge: (dest, source) => source,
    });
    return this.sendValues();
  }

  @client
  overwrite(newValues: Object): void {
    this.values = newValues;
    return this.sendValues();
  }

  @client
  finish() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.Finish',
    });
  }

  private sendValues() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.SetValue',
      data: {
        path: ['remixData'],
        newValue: this.values,
        skipUpdate: true,
      },
    });
  }
}

export const remix = new Remix();
