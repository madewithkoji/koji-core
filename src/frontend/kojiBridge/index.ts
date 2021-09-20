/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidv4 } from 'uuid';

interface MessageListenerData {
  /** Name of the event. */
  event: string;
  /** Unique key to prevent duplicate processing. */
  _idempotencyKey?: string;
}

interface PostMessage {
  /** Name of the event. */
  kojiEventName: string;
  /** Data to send with event. */
  data?: any;
}
/**
 * Enables communication between the platform and the Koji app.
 */
export class KojiBridge {
  /**
   * Sets a listener for a specific event, and invokes a function to handle the event.
   *
   * @param   callback  Function to run when the event is fired.
   * @param   eventName Name of the event.
   * @return            [description]
   */
  protected execCallbackOnMessage(callback: Function, eventName: string) {
    const messageListener = ({ data }: { data: MessageListenerData }) => {
      const { event } = data;
      if (event === eventName) {
        callback(data);
      }
    };

    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }

  /**
   *
   * @param   postMessage Data to be sent to the Koji app.
   */
  protected sendMessage(postMessage: PostMessage): void {
    window.parent.postMessage(
      {
        _kojiEventName: postMessage.kojiEventName,
        _type: postMessage.kojiEventName,
        _feedKey: window.KOJI_FEED_KEY,
        ...postMessage.data,
      },
      '*',
    );
  }

  protected sendMessageAndAwaitResponse(postMessage: PostMessage, platformMessageName: string, additionalPlatformMessageName?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const idempotencyKey = uuidv4();

      const messageListener = ({ data }: { data: MessageListenerData }) => {
        try {
          const { event, _idempotencyKey } = data;
          if ((event === platformMessageName || event === additionalPlatformMessageName) && idempotencyKey === _idempotencyKey) {
            window.removeEventListener('message', messageListener);
            resolve(data);
          }
        } catch (err) {
          reject(err);
        }
      };

      window.addEventListener('message', messageListener);

      window.parent.postMessage(
        {
          _kojiEventName: postMessage.kojiEventName,
          _type: postMessage.kojiEventName,
          _feedKey: window.KOJI_FEED_KEY,
          _idempotencyKey: idempotencyKey,
          ...postMessage.data,
        },
        '*',
      );
    });
  }

  protected registerMessageListener(eventName: string, callback: (result: any) => void) {
    window.addEventListener('message', ({ data }: { data: MessageListenerData }) => {
      if (data.event === eventName) {
        const spreadableData = JSON.parse(JSON.stringify(data));
        callback(spreadableData);
      }
    });
  }
}
