import qs from 'qs';
import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

/**
 * Context in which the Koji is being viewed. A Koji can provide a distinct experience for each context.
 */
export type PlayerStateContext = 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'default';

/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export type PlayerStateReceiptType = 'buyer' | 'seller';

/**
 *
 */
export interface ExpectedQueryParameters {
  context?: PlayerStateContext;
  'dynamic-receipt'?: PlayerStateReceiptType;
}

/**
 * Type of editor, either `instant` for an instant remix or `full` for the code editor.
 */
export type EditorType = 'instant' | 'full';
/**
 * Distinguishes between a `new` remix and an `edit` to the user’s existing Koji.
 */
export type EditorMode = 'edit' | 'new';

/**
 * Describes the remixer's editor.
 */
export interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export type ReceiptType = 'seller' | 'buyer';

/**
 * Function to handle changes in remix state. Receives the following properties as inputs:
* @callback
* @param {boolean} isRemixing Indicates whether the Koji is in remixing mode.
* @param {EditorAttributes} editorAttributes
 */
export type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

/**
 * Manages the context of the Koji to enable distinct experiences for different users and views.
 */
export class PlayerState extends KojiBridge {
  context: PlayerStateContext = 'default';
  receiptType?: ReceiptType;

  constructor() {
    super();

    // ToDo: Make this better, as it's just a way to get around the isomorphism
    // of this package
    if (typeof window as any === 'undefined') return;

    const params: ExpectedQueryParameters = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    if (window.location.href.includes('koji-screenshot')) {
      this.context = 'screenshot';
    } else {
      const { context = 'default', 'dynamic-receipt': receiptType } = params;

      this.context = context;
      this.receiptType = receiptType;
    }
  }

  /**
   * Listens to changes in remix state and invokes a callback function to enable different experiences during remix, preview, or use.
   *
   * @param   callback
   * @return           Function to unsubscribe from remix state listener.
   * @example
   * ```javascript
   * const unsubscribe = Koji.playerState.subscribe((remixing, { type, mode }) => {
   *  // Change Koji experience
   * });
   * ```
   */
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

export const playerState = new PlayerState();
