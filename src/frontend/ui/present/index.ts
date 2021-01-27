import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

export interface PresentConfirmationOptions {
  title?: string;
  message?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}

export interface PresentAlertOptions {
  title: string;
  message: string;
}

export class Present extends KojiBridge {
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
