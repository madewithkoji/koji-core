export declare class Analytics {
    /**
     * Just a test
     * @param event Cool event
     * @param payload The payload
     */
    track(event: string, payload?: {
        [index: string]: any;
    }): boolean;
}
export declare const analytics: Analytics;
