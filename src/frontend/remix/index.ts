import deepmerge from 'deepmerge';
import { PlayerState } from '../playerState';
import { client } from '../@decorators/client';

declare global {
  interface Window {
    KOJI_OVERRIDES: any;
  }
}

export class Remix extends PlayerState {
  private values: any = {};
  private isInitialized: boolean = false;

  @client
  init(initialValues: Object, remixInitialValues: Object) {
    if (this.isInitialized) {
      console.warn('You are trying to initialize your remix data more than one time.');
      return;
    }

    this.isInitialized = true;

    const defaultValues = this.context === 'remix' ? remixInitialValues : initialValues;

    let overrides = {};
    if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
      overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
    }

    console.log('initialValues', initialValues);
    console.log('remixInitial', remixInitialValues);
    console.log('defaultValues', defaultValues);
    console.log('overrides', overrides);

    console.log('out', deepmerge(defaultValues, overrides, {
      arrayMerge: (dest, source) => source,
    }));
    this.values = deepmerge(defaultValues, overrides, {
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
