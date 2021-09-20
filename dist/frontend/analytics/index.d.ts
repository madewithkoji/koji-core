/**
 * Enables you to track custom events in your Koji apps.
 * For example, track `onClick` events for the links and buttons in a Koji app.
 *
 * To view the analytics data for a published Koji app, view the published app, click the **App** link, and then **Open Analytics**.
 * You will see data for the custom events along with a standard set of built-in metrics, which are calculated from the app’s access logs.
 *
 * TIP: Analytics data is processed at frequent intervals throughout the day. If you are testing the custom events in a published app and you don’t see results at first, wait 10 minutes to account for data processing latency, and then check again.
 */
export declare class Analytics {
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
    track(event: string, payload?: {
        [index: string]: any;
    }): boolean;
}
export declare const analytics: Analytics;
