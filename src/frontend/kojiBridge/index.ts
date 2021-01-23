import { v4 as uuidv4 } from 'uuid';

interface MessageListenerData {
  event: string;
  _idempotencyKey?: string;
}

interface PostMessage {
  kojiEventName: string;
  data?: any;
}

export class KojiBridge {
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

  protected sendMessage(postMessage: PostMessage): void {
    window.parent.postMessage(
      {
        _kojiEventName: postMessage.kojiEventName,
        _type: postMessage.kojiEventName,
        _feedKey: window.location.hash.replace('#koji-feed-key=', ''),
        ...postMessage.data,
      },
      '*',
    );
  }

  protected sendMessageAndAwaitResponse(postMessage: PostMessage, platformMessageName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const idempotencyKey = uuidv4();

      console.log('called', idempotencyKey);

      const messageListener = ({ data }: { data: MessageListenerData }) => {
        const { event, _idempotencyKey } = data;
        if (event === platformMessageName && idempotencyKey === _idempotencyKey) {
          try {
            resolve(data);
          } catch (err) {
            reject(err);
          }
          window.removeEventListener('message', messageListener);
        }
      };

      window.addEventListener('message', messageListener);

      window.parent.postMessage(
        {
          _kojiEventName: postMessage.kojiEventName,
          _type: postMessage.kojiEventName,
          _feedKey: window.location.hash.replace('#koji-feed-key=', ''),
          _idempotencyKey: idempotencyKey,
          ...postMessage.data,
        },
        '*',
      );
    });
  }
}
