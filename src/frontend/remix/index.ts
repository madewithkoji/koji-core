import deepmerge from 'deepmerge';
import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

declare global {
  interface Window { KOJI_OVERRIDES: any; }
}

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

export class Remix extends KojiBridge {
  private values: any = {};
  private isInitialized: boolean = false;

  @client
  subscribe(callback: IsRemixingCallback): Function {
    return this.execCallbackOnMessage(
      ({ isRemixing, editorAttributes }: { isRemixing: boolean; editorAttributes: EditorAttributes }) => {
        callback(isRemixing, editorAttributes);
      },
      'KojiPreview.IsRemixing',
    );
  }

  init(values: any) {
    if (this.isInitialized) throw new Error('You are trying to initialize your remix data more than one time.');

    if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
      this.values = deepmerge(values, window.KOJI_OVERRIDES.overrides, {
        arrayMerge: (dest, source) => source,
      });
    } else {
      this.values = values;
    }

    this.isInitialized = true;
  }

  get() {
    return this.values;
  }

  set(newValue: any): void {
    this.values = deepmerge(this.values, newValue, {
      arrayMerge: (dest, source) => source,
    });

    this.sendMessage(
      {
        kojiEventName: 'KojiPreview.SetValue',
        data: {
          path: ['remixData'],
          newValue: this.values,
          skipUpdate: true,
        },
      },
    );
  }

  finish() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.Finish',
    });
  }
}

export const remix = new Remix();
