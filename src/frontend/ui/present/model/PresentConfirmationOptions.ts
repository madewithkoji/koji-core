/**
 * Defines a confirmation dialog box to show a user.
 */
export interface PresentConfirmationOptions {
  /** Title for the dialog box (`Confirm` by default). */
  title?: string;
  /** Question to ask the user (empty by default). */
  message?: string;
  /** Label for the confirm action (`Confirm` by default). */
  confirmButtonLabel?: string;
  /** Label for the cancel action (`Cancel` by default). */
  cancelButtonLabel?: string;
}
