import { PlatformCommunication } from '../platformCommunication';
import { client } from '../@decorators/client';

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

/**
 * This callback is called when the remix state changes.
 * @typedef isRemixingCallback
 * @param {boolean} isRemixing Indicates if the koji is in remix mode.
 * @param {Object} editorAttributes - Attributes about the current editor state.
 * @param {string} editorAttributes.type - The editor type.
 * @param {string} editorAttributes.mode - The editor mode.
 */

export class Remix extends PlatformCommunication {
  /**
   * Subscribe to updates to the remix state
   * @param {isRemixingCallback} callback - The callback that handles the response.
   * @return {function} The unsubscribe function.
   */
  @client
  subscribe(callback: IsRemixingCallback): Function {
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
