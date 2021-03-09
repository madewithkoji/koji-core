import { KojiBridge } from '../../kojiBridge';
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
/**
 * Defines an alert dialog box to show a user.
 */
export interface PresentAlertOptions {
    /** Title for the dialog box. */
    title: string;
    /** Information to display to the user. */
    message: string;
}
/**
 * Presents dialog boxes to users on the frontend of your Koji.
 */
export declare class Present extends KojiBridge {
    /**
     * Presents a confirmation dialog box to a user. Use this method for messages that require a decision from the user, such as to ask whether to proceed with an action. For messages that do not require a decision, use [[alert]].
     *
     * @param   options
     * @return          Whether the user confirmed (`true`) or cancelled (`false`) the action.
     *
     * @example
     * ```javascript
     * const confirmed = await Koji.ui.present.confirmation({
     *  title: 'Delete File',
     *  message: 'Are you sure you want to delete this file?',
     *  confirmButtonLabel: 'Delete',
     *  cancelButtonLabel: 'Cancel'
     * });
     * ```
     */
    confirmation(options?: PresentConfirmationOptions): Promise<boolean>;
    /**
     * Presents an alert dialog box to the user. Use this method for messages that do not require any response from the user, other than an acknowledgement. For messages that require a decision, use [[confirmation]].
     *
     * @param   options
     *
     * @example
     * ```javascript
     * Koji.ui.present.alert({
     *  title: 'Image Posted',
     *  message: 'Your new image is available on your fan wall!'
     * });
     */
    alert(options: PresentConfirmationOptions): void;
}
export declare const present: Present;
