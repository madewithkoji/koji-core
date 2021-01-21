export declare class Analytics {
    track(event: string, payload?: {
        [index: string]: any;
    }): boolean;
}
export declare const analytics: Analytics;
