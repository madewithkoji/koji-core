import qs from 'qs';
import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

/**
 * Context in which the Koji is being viewed. A Koji can provide a distinct experience for each context.
 */
export type PlayerStateContext = 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'default';

/**
 * View of the receipt for a transaction, either `buyer` or `seller`.
 */
export type PlayerStateReceiptType = 'buyer' | 'seller';

/**
 * Presentation style of the Koji, either in a modal window (`popover`) or the standard player (`fullscreen`).
 * The popover presentation style does not display the Koji button, so the Koji can use the full view.
 */
export type PlayerPresentationStyle = 'fullscreen' | 'popover';

/**
 * URL query parameters that describe the current state of the Koji player.
 */
export interface ExpectedQueryParameters {
  context?: PlayerStateContext;
  'dynamic-receipt'?: PlayerStateReceiptType;
  presentationStyle?: PlayerPresentationStyle;
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
  /** Type of editor, either `instant` for an instant remix or `full` for the code editor. */
  type?: EditorType;
  /** Distinguishes between a `new` remix and an `edit` to the user's existing Koji. */
  mode?: EditorMode;
}

/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export type ReceiptType = 'seller' | 'buyer';

export type IsRemixingCallback =
  /**
   * Function to handle changes in remix state. Invoked by the [[subscribe]] listener.
   *
   * @param isRemixing Indicates whether the Koji is in remixing mode.
   * @param editorAttributes
   */
  (isRemixing: boolean, editorAttributes: EditorAttributes) => void;

export type BlurCallback =
/** Function to handle when the Koji leaves focus. Invoked by the [[onBlur]] listener. */
() => void;

export type FocusCallback =
/** Function to handle when the Koji enters focus. Invoked by the [[onFocus]] listener. */
() => void;

/**
 * Manages the state of the Koji player to enable distinct experiences for different users and views.
 */
export class PlayerState extends KojiBridge {
  /** Context of the Koji. */
  public context: PlayerStateContext = 'default';
  /** Type of receipt. */
  public receiptType?: ReceiptType;
  /** Focus state of the Koji. */
  public hasFocus: boolean = false;
  /** Presentation style of the Koji. */
  public presentationStyle: PlayerPresentationStyle = 'fullscreen';
  /** Whether the player chrome is visible */
  public isChromeVisible: boolean = false;

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
      const {
        context = 'default',
        'dynamic-receipt': receiptType,
        presentationStyle = 'fullscreen',
      } = params;

      this.context = context;
      this.receiptType = receiptType;
      this.presentationStyle = presentationStyle;
    }

    // Set the initial value based on the feed hash
    this.hasFocus = !window.location.hash.includes('#koji-feed-key=');

    if (this.presentationStyle === 'fullscreen') {
      this.isChromeVisible = true;
    }
  }

  /**
   * Listens for when a Koji enters focus and invokes a callback function to respond to the focus state change.
   *
   * @param   callback  Function to handle when the Koji enters focus.
   *
   * @return            Function to unsubscribe from the onFocus listener.
   *
   * @example
   * ```javascript
   * const unsubscribeFocus = Koji.playerState.onFocus((focus) => {
   *  // Change Koji experience
   * });
   * ```
   */
  @client
  public onFocus(callback: FocusCallback): Function {
    this.hasFocus = true;

    return this.execCallbackOnMessage(() => {
      callback();
    }, 'KojiFeed.Play');
  }

  /**
   * Listens for when a Koji leaves focus and invokes a callback function to respond to the focus state change.
   *
   * @param   callback Function to handle when the Koji leaves focus.
   *
   * @return            Function to unsubscribe from the onBlur listener.
   *
   * @example
   * ```javascript
   * const unsubscribeBlur = Koji.playerState.onBlur((blur) => {
   *  // Change Koji experience
   * });
   * ```
   */
  @client
  public onBlur(callback: BlurCallback): Function {
    this.hasFocus = false;

    return this.execCallbackOnMessage(() => {
      callback();
    }, 'KojiFeed.Pause');
  }

  /**
   * Hide any platform chrome, like the Koji button or the current user's
   * notification/profile icon. Incorrectly controlling player chrome can result
   * in a disorienting user experience, so this functionality should be used
   * judiciously. Koji chrome must be displayed on all Root screens in a
   * template, and can be hidden if a user navigates to a deeper screen inside
   * the template.
   */
  @client
  public hideChrome() {
    this.sendMessage({
      kojiEventName: 'Koji.Player.HideChrome',
      data: {},
    });
    this.isChromeVisible = false;
  }

  /**
   * If platform chrome has been hidden, restore it.
   */
  public showChrome() {
    this.sendMessage({
      kojiEventName: 'Koji.Player.ShowChrome',
      data: {},
    });
    this.isChromeVisible = true;
  }

  /**
   * Listens to changes in remix state and invokes a callback function to enable different experiences during remix, preview, or use.
   *
   * @param   callback Function to handle changes in remix state.
   *
   * @return           Function to unsubscribe from the remix state listener.
   *
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
