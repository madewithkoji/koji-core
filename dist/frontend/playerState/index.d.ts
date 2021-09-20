import { KojiBridge } from '../kojiBridge';
/**
 * Context in which the Koji app is being viewed. A Koji app can provide a distinct experience for each context.
 */
export declare type PlayerStateContext = 'remix' | 'receipt' | 'screenshot' | 'default';
/**
 * View of the receipt for a transaction, either `buyer` or `seller`.
 */
export declare type PlayerStateReceiptType = 'buyer' | 'seller';
/**
 * Presentation style of the Koji app, either in a modal window (`popover`) or the standard player (`fullscreen`).
 * The player chrome (including the user's profile icon) is hidden by default when the app's `presentationStyle` is `popover`.
 */
export declare type PlayerPresentationStyle = 'fullscreen' | 'popover';
/**
 * URL query parameters that describe the current state of the Koji player.
 */
export interface ExpectedQueryParameters {
    context?: PlayerStateContext;
    'dynamic-receipt'?: PlayerStateReceiptType;
    presentationStyle?: PlayerPresentationStyle;
}
/**
 * Type of editor the creator is using, either `instant` for the Koji player or `full` for the Koji code editor.
 */
export declare type EditorType = 'instant' | 'full';
/**
 * Distinguishes between creating a `new` customized version of the app and doing an `edit` of the user’s existing Koji app.
 */
export declare type EditorMode = 'edit' | 'new';
/**
 * Describes the editor that the creator is using.
 */
export interface EditorAttributes {
    /** Type of editor the creator is using, either `instant` for the Koji player or `full` for the Koji code editor. */
    type?: EditorType;
    /** Distinguishes between creating a `new` customized version of the app and doing an `edit` of the user’s existing Koji app. */
    mode?: EditorMode;
}
/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export declare type ReceiptType = 'seller' | 'buyer';
export declare type IsRemixingCallback = 
/**
 * Function to handle changes in the customization mode. Invoked by the [[subscribe]] listener.
 *
 * @param isRemixing Indicates whether the app is in customization mode.
 * @param editorAttributes
 */
(isRemixing: boolean, editorAttributes: EditorAttributes) => void;
export declare type BlurCallback = 
/** Function to handle when the Koji app loses focus. Invoked by the [[onBlur]] listener. */
() => void;
export declare type FocusCallback = 
/** Function to handle when the Koji app gets focus. Invoked by the [[onFocus]] listener. */
() => void;
/**
 * Manages the state of the Koji player to enable distinct experiences for different users and views.
 */
export declare class PlayerState extends KojiBridge {
    /** Context of the Koji app. */
    context: PlayerStateContext;
    /** Type of receipt. */
    receiptType?: ReceiptType;
    /** Focus state of the Koji app. */
    hasFocus: boolean;
    /** Presentation style of the Koji app. */
    presentationStyle: PlayerPresentationStyle;
    /** Whether the player chrome (Koji platform buttons and navigation) is visible. */
    isChromeVisible: boolean;
    constructor();
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
    onFocus(callback: FocusCallback): Function;
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
    onBlur(callback: BlurCallback): Function;
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
    hideChrome(): void;
    /**
     * Restores the Koji platform chrome, if it has been hidden with [[hideChrome]].
     *
     * @example
     * ```javascript
     * Koji.playerState.showChrome();
     * ```
     */
    showChrome(): void;
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
    subscribe(callback: IsRemixingCallback): Function;
}
export declare const playerState: PlayerState;
