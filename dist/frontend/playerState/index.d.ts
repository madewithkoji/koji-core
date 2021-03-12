import { KojiBridge } from '../kojiBridge';
/**
 * Context in which the Koji is being viewed. A Koji can provide a distinct experience for each context.
 */
export declare type PlayerStateContext = 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'default';
/**
 * Who is viewing the receipt for a transaction, either `buyer` or `seller`.
 */
export declare type PlayerStateReceiptType = 'buyer' | 'seller';
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
export declare type EditorType = 'instant' | 'full';
/**
 * Distinguishes between a `new` remix and an `edit` to the user’s existing Koji.
 */
export declare type EditorMode = 'edit' | 'new';
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
export declare type ReceiptType = 'seller' | 'buyer';
export declare type IsRemixingCallback = 
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
export declare class PlayerState extends KojiBridge {
    /** The initial context of the Koji. */
    context: PlayerStateContext;
    /** The type of receipt. */
    receiptType?: ReceiptType;
    /** Focus state of the Koji. */
    hasFocus: boolean;
    constructor();
    /**
     * Listens to when a Koji is returned to a focus state.
     *
     * @param   callback  Callback function.
     * @return            Function to unsubscribe from the focus state listener.
     */
    onFocus(callback: Function): Function;
    /**
     * Listens to when a Koji leaves a focus state.
     *
     * @param   callback  Callback function.
     * @return            Function to unsubscribe from the un-focus state listener.
     */
    onBlur(callback: Function): Function;
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
    subscribe(callback: IsRemixingCallback): Function;
}
export declare const playerState: PlayerState;
