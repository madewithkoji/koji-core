import { client } from '../@decorators/client';

export class Analytics {
  @client
  track(event: string, payload?: { [index: string]: any }): boolean {
    window.parent.postMessage(
      {
        _kojiEventName: '@@koji/analytics/track',
        event,
        payload: payload || null,
      },
      '*',
    );

    return true;
  }
}

export const analytics = new Analytics();
