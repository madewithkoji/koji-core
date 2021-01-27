import { KojiBridge } from '../kojiBridge';
export declare type PlayerStateContext = 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'default';
export declare type PlayerStateReceiptType = 'buyer' | 'seller';
export interface ExpectedQueryParameters {
    context?: PlayerStateContext;
    'dynamic-receipt'?: PlayerStateReceiptType;
}
export declare type EditorType = 'instant' | 'full';
export declare type EditorMode = 'edit' | 'new';
export interface EditorAttributes {
    type?: EditorType;
    mode?: EditorMode;
}
export declare type ReceiptType = 'seller' | 'buyer';
export declare type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => void;
export declare class PlayerState extends KojiBridge {
    context: PlayerStateContext;
    receiptType?: ReceiptType;
    constructor();
    subscribe(callback: IsRemixingCallback): Function;
}
export declare const playerState: PlayerState;
