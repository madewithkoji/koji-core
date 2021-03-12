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
  /** [[EditorType]] */
  type?: EditorType;
  mode?: EditorMode;
}

/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export type ReceiptType = 'seller' | 'buyer';

export type IsRemixingCallback =
  /**
   * Function to handle changes in remix state. Receives the `isRemixing` and `editorAttributes` properties as inputs.
   *
   * @param isRemixing Indicates whether the Koji is in remixing mode.
   * @param editorAttributes
   */
  (isRemixing: boolean, editorAttributes: EditorAttributes) => void;

/**
 * Manages the context of the Koji to enable distinct experiences for different users and views.
 */
export class PlayerState extends KojiBridge {
  /** The initial context of the Koji. */
  public context: PlayerStateContext = 'default';
  /** The type of receipt. */
  public receiptType?: ReceiptType;
  /** Focus state of the Koji. */
  public hasFocus: boolean = false;

  public constructor() {
    super();

    // ToDo: Make this better, as it's just a way to get around the isomorphism
    // of this package
    if ((typeof window as any) === 'undefined') return;

    // Pull off any query parameters
    const params: ExpectedQueryParameters = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    // First, look for the screenshot context
    if (window.location.href.includes('koji-screenshot')) {
      this.context = 'screenshot';
    } else {
      // Otherwise, pull the context from the query parameters
      const { context = 'default', 'dynamic-receipt': receiptType } = params;

      this.context = context;
      this.receiptType = receiptType;
    }

    // Set the initial value based on the feed hash
    this.hasFocus = !window.location.hash.includes('#koji-feed-key=');
  }

  /**
   * Listens to when a Koji is returned to a focus state.
   *
   * @param   callback  Callback function.
   * @return            Function to unsubscribe from the focus state listener.
   */
  @client
  public onFocus(callback: Function): Function {
    this.hasFocus = true;

    return this.execCallbackOnMessage(() => {
      callback();
    }, 'KojiFeed.Play');
  }

  /**
   * Listens to when a Koji leaves a focus state.
   *
   * @param   callback  Callback function.
   * @return            Function to unsubscribe from the un-focus state listener.
   */
  @client
  public onBlur(callback: Function): Function {
    this.hasFocus = false;

    return this.execCallbackOnMessage(() => {
      callback();
    }, 'KojiFeed.Pause');
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
  public subscribe(callback: IsRemixingCallback): Function {
    return this.execCallbackOnMessage(({ isRemixing, editorAttributes }: { isRemixing: boolean; editorAttributes: EditorAttributes }) => {
      callback(isRemixing, editorAttributes);
    }, 'KojiPreview.IsRemixing');
  }
}

export const playerState = new PlayerState();
