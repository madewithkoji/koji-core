import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

export class Remix extends KojiBridge {
  @client
  subscribe(callback: IsRemixingCallback): Function {
    return this.execCallbackOnMessage(
      ({ isRemixing, editorAttributes }: { isRemixing: boolean; editorAttributes: EditorAttributes }) => {
        callback(isRemixing, editorAttributes);
      },
      'KojiPreview.IsRemixing',
    );
  }
}

export const remix = new Remix();
