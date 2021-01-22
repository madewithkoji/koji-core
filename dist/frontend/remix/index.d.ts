import { PlayerState } from '../playerState';
declare global {
    interface Window {
        KOJI_OVERRIDES: any;
    }
}
export declare class Remix extends PlayerState {
    private values;
    private isInitialized;
    init(initialValues: Object, remixInitialValues: Object): void;
    get(): any;
    set(newValue: Object): void;
    overwrite(newValues: Object): void;
    finish(): void;
    private sendValues;
}
export declare const remix: Remix;
