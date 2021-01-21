import { KojiBridge } from '../bridge';
declare global {
    interface Window {
        KOJI_OVERRIDES: any;
    }
}
declare type EditorType = 'instant' | 'full';
declare type EditorMode = 'edit' | 'new';
interface EditorAttributes {
    type?: EditorType;
    mode?: EditorMode;
}
declare type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;
export declare class Remix extends KojiBridge {
    private values;
    subscribe(callback: IsRemixingCallback): Function;
    init(values: any): void;
    get(path: string[]): any;
    set(path: string, newValue: any): Promise<any>;
}
export declare const remix: Remix;
export {};
