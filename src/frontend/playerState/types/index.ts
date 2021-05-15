import { EditorAttributes } from '../model/EditorAttributes';

/**
 * Context in which the Koji is being viewed. A Koji can provide a distinct experience for each context.
 */
export type PlayerStateContext =
  | 'about'
  | 'admin'
  | 'remix'
  | 'sticker'
  | 'receipt'
  | 'screenshot'
  | 'default';

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
 * Type of editor, either `instant` for an instant remix or `full` for the code editor.
 */
export type EditorType = 'instant' | 'full';

/**
 * Distinguishes between a `new` remix and an `edit` to the user’s existing Koji.
 */
export type EditorMode = 'edit' | 'new';

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
