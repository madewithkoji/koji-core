import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Defines a confirmation dialog box to show a user.
 */
export interface PresentConfirmationOptions {
  /** Title for the dialog box. */
  title?: string;
  /** Question to ask the user. */
  message?: string;
  /** Label for the confirm action. */
  confirmButtonLabel?: string;
  /** Label for the cancel action. */
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
export class Present extends KojiBridge {
  /**
   * Presents a confirmation dialog box to a user. Use this method for messages that require a response from the user, such as to ask whether to proceed with an action. For messages that do not require a response, use [[alert]].
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
  @client
  async confirmation(options: PresentConfirmationOptions = {}): Promise<boolean> {
    const data = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.ConfirmPrompt',
        data: {
          title: options.title,
          message: options.message,
          confirmButtonLabel: options.confirmButtonLabel,
          cancelButtonLabel: options.cancelButtonLabel,
        },
      },
      'Koji.ConfirmResolved',
    );

    return data.didConfirm;
  }

  /**
   * Presents an alert dialog box to the user. Use this method for messages that do not require any response from the user, other than an acknowledgement. For messages that require a response, use [[confirmation]].
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
  @client
  alert(options: PresentConfirmationOptions): void {
    this.sendMessage(
      {
        kojiEventName: 'Koji.Alert',
        data: {
          title: options.title,
          message: options.message,
          confirmButtonLabel: options.confirmButtonLabel,
          cancelButtonLabel: options.cancelButtonLabel,
        },
      },
    );
  }
}

export const present = new Present();
