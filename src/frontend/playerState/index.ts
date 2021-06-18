import qs from 'qs';
import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

/**
 * Context in which the Koji app is being viewed. A Koji app can provide a distinct experience for each context.
 */
export type PlayerStateContext = 'remix' | 'receipt' | 'screenshot' | 'default';

/**
 * View of the receipt for a transaction, either `buyer` or `seller`.
 */
export type PlayerStateReceiptType = 'buyer' | 'seller';

/**
 * Presentation style of the Koji app, either in a modal window (`popover`) or the standard player (`fullscreen`).
 * The player chrome (including the user's profile icon) is hidden by default when the app's `presentationStyle` is `popover`.
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
 * Type of editor, either `instant` to customize the Koji app's configuration or `full` to edit the app's code in the Koji code editor.
 */
export type EditorType = 'instant' | 'full';
/**
 * Distinguishes between creating a `new` customized version of the app and doing an `edit` of the user’s existing Koji app.
 */
export type EditorMode = 'edit' | 'new';

/**
 * Describes the editor to use.
 */
export interface EditorAttributes {
  /** Type of editor, either `instant` to customize the Koji app's configuration or `full` to edit the app's code in the Koji code editor. */
  type?: EditorType;
  /** Distinguishes between creating a `new` customized version of the app and doing an `edit` of the user’s existing Koji app. */
  mode?: EditorMode;
}

/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export type ReceiptType = 'seller' | 'buyer';

export type IsRemixingCallback =
  /**
   * Function to handle changes in the customization mode. Invoked by the [[subscribe]] listener.
   *
   * @param isRemixing Indicates whether the Koji is in customization mode.
   * @param editorAttributes
   */
  (isRemixing: boolean, editorAttributes: EditorAttributes) => void;

export type BlurCallback =
/** Function to handle when the Koji app loses focus. Invoked by the [[onBlur]] listener. */
() => void;

export type FocusCallback =
/** Function to handle when the Koji app gets focus. Invoked by the [[onFocus]] listener. */
() => void;

/**
 * Manages the state of the Koji player to enable distinct experiences for different users and views.
 */
export class PlayerState extends KojiBridge {
  /** Context of the Koji app. */
  public context: PlayerStateContext = 'default';
  /** Type of receipt. */
  public receiptType?: ReceiptType;
  /** Focus state of the Koji app. */
  public hasFocus: boolean = false;
  /** Presentation style of the Koji app. */
  public presentationStyle: PlayerPresentationStyle = 'fullscreen';
  /** Whether the player chrome (Koji platform buttons and navigation) is visible. */
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
    this.hasFocus = !window.KOJI_FEED_KEY;

    if (this.presentationStyle === 'fullscreen') {
      this.isChromeVisible = true;
    }
  }

  /**
   * Listens for event notifications that the Koji app got the focus and then invokes a callback function to respond to the focus state change.
   *
   * @param   callback  Function to handle when the Koji app gets the focus.
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
   * Listens for event notifications that the Koji app lost the focus and then invokes a callback function to respond to the focus state change.
   *
   * @param   callback Function to handle when the Koji app loses the focus.
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
   * Hides any Koji player chrome, such as the user's profile icon.
   * To display the player chrome, use [[showChrome]].
   *
   * NOTE: Incorrectly controlling the player chrome can result in a disorienting user experience, so use this functionality judiciously.
   * The player chrome must be displayed on all root screens of an app. It can be hidden if a user navigates to a child screen, such as a modal.
   * The player chrome is hidden by default when the app's `presentationStyle` is `popover`.
   *
   * @example
   * ```javascript
   * Koji.playerState.hideChrome();
   * ```
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
   * Restores the Koji platform chrome, if it has been hidden with [[hideChrome]].
   *
   * @example
   * ```javascript
   * Koji.playerState.showChrome();
   * ```
   */
  public showChrome() {
    this.sendMessage({
      kojiEventName: 'Koji.Player.ShowChrome',
      data: {},
    });
    this.isChromeVisible = true;
  }

  /**
   * Listens to changes in customization mode and invokes a callback function to enable different experiences during customization, preview, or use.
   *
   * @param   callback Function to handle changes in customization mode.
   *
   * @return           Function to unsubscribe from the customization mode listener.
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
