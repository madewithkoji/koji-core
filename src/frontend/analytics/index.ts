import { client } from '../@decorators/client';

/**
 * Enables you to track custom events in your Koji templates. For example, track `onClick` events for the links and buttons in a Koji.
 *
 * To view the analytics data for your published Koji, go to **Manage this Koji > Open Creator Dashboard > Open Analytics**. You will see data for your custom events along with a standard set of built-in metrics, which are calculated from the Koji’s access logs.
 *
 * <p class="tip">Analytics data is processed at frequent intervals throughout the day. If you are testing the custom events in a published template and you don’t see results at first, wait 10 minutes to account for data processing latency, and then check again.</p>
 */
export class Analytics {
  /**
   * Generates an analytics event with the specified name and data payload, if applicable.
   *
   * @param  event   Name of the custom event.
   * @param  payload List of custom key-value pairs to save with the event.
   * @return         Indicates whether the event was generated.
   *
   * @example
   *
   * ```javascript
   * const event = Koji.analytics.track('My Custom Event');
   *
   * // with optional payload
   * const event = Koji.analytics.track('Won game', { score: 120 });
   * ```
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

export const analytics = new Analytics();
