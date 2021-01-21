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
  private values: any;

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
    if (this.values) throw new Error('You are trying to initialize your remix data more than one time.');

    if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
      this.values = deepmerge(values, window.KOJI_OVERRIDES.overrides, {
        arrayMerge: (dest, source) => source,
      });
    } else {
      this.values = values;
    }
  }

  get(path: string[]) {
    let pointer = this.values;
    for (let i = 0; i < path.length; i += 1) {
      pointer = pointer[path[i]];
    }
    return pointer;
  }

  async set(path: string, newValue: any): Promise<any> {
    const data: any = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.SetValue',
        data: {
          path,
          newValue,
          skipUpdate: true,
        },
      },
      'KojiPreview.DidChangeVcc',
    );

    return data;
  }
}

export const remix = new Remix();
