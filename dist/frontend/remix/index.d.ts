import { PlayerState } from '../playerState';
declare global {
    interface Window {
        KOJI_OVERRIDES: any;
    }
}
export declare type EditorType = 'instant' | 'full';
export declare type EditorMode = 'edit' | 'new';
export interface EditorAttributes {
    type?: EditorType;
    mode?: EditorMode;
}
export declare type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;
export declare class Remix extends PlayerState {
    private values;
    private isInitialized;
    subscribe(callback: IsRemixingCallback): Function;
    init(initialValues: Object, remixInitialValues: Object): void;
    get(): any;
    set(newValue: Object): void;
    overwrite(newValues: Object): void;
    finish(): void;
    private sendValues;
}
export declare const remix: Remix;
