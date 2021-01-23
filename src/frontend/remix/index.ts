import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

/**
 * Describes the remixer's editor.
 */
interface EditorAttributes {
  /** Describes the type of editor, either `instant` for an instant remix or `full` for the code editor. */
  type?: EditorType;
  /** Distinguishes between a `new` remix and an `edit` to the user’s existing Koji. */
  mode?: EditorMode;
}

/**
 * Handles changes in remix state. Receives the following properties as inputs:
 * @callback
 * @param {boolean} isRemixing Indicates whether the Koji is in remixing mode.
 * @param {EditorAttributes} editorAttributes
 */
type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

/**
 * Manages the remixing experience for your Koji.
 */
export class Remix extends KojiBridge {
  /**
   * Listens to changes in remix state and invokes a callback function to enable different experiences during remix, preview, or use.
   *
   * @param   {IsRemixingCallback} callback  Handles changes in remix state. Receives the following properties as inputs:
   * @example
   * ```javascript
   * Koji.Remix((isRemixing,editorAttributes) => {
   *  // Change Koji experience
   * });
   * ```
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

export const remix = new Remix();
