import { PlatformCommunication } from '../platformCommunication';
import { client } from '../@decorators/client';

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

/** Class representing the remix state. */
export class Remix extends PlatformCommunication {
  @client
  subscribe(callback: Function): Function {
    return this.listen(
      ({ isRemixing, editorAttributes }: { isRemixing: boolean; editorAttributes: EditorAttributes }) => {
        callback(isRemixing, editorAttributes);
      },
      'KojiPreview.IsRemixing',
    );
  }
}

export interface IRemix extends Remix {}

export const remix = new Remix();
