export class PlatformCommunication {
  listen(callback: Function, eventName: string) {
    const messageListener = ({ data }: { data: { event: string; token?: string } }) => {
      const { event } = data;
      if (event === eventName) {
        console.log('match', eventName);
        console.log('callback', data);
        callback(data);
      }
    };

    console.log('add event listener');
    window.addEventListener('message', messageListener);

    return () => {
      console.log('return unsubscribe');
      window.removeEventListener('message', messageListener);
    };
  }

  /**
   * A wrapper for one-off listeners with a predictable lifecycle
   * @param postMessage Name of the post message event to send to the platform, method-specific data to send to the platform
   * @param platformMessageName Name of the post message event we'll be listening for as a platform response
   */
  postToPlatform(postMessage: { name: string; data?: any }, platformMessageName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const messageListener = ({ data }: { data: { event: string; token?: string } }) => {
        const { event } = data;
        if (event === platformMessageName) {
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
          _kojiEventName: postMessage.name,
          ...postMessage.data,
        },
        '*',
      );
    });
  }
}
