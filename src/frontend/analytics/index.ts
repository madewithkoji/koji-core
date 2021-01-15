import { client } from '../@decorators/client';

export class Analytics {
  /**
   * Report a trackable event.
   * @param event Name of the event, e.g., ButtonClicked
   * @param payload List of custom key-value pairs to save with the event.
   */
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

export interface IAnalytics extends Analytics {}

export const analytics = new Analytics();
