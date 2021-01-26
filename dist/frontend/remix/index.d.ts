import { KojiBridge } from '../kojiBridge';
declare global {
    interface Window {
        KOJI_OVERRIDES: any;
    }
}
export interface ValueChanged {
    path: string[];
    newValue: any;
    savedValue: any;
}
export declare class Remix extends KojiBridge {
    private values;
    private isInitialized;
    init(remixData: any): void;
    get(): any;
    set(newValue: Object): Promise<boolean>;
    overwrite(newValues: Object): Promise<boolean>;
    finish(): void;
    encryptValue(plaintextValue: string): Promise<string>;
    decryptValue(encryptedValue: string): Promise<string>;
    private sendValues;
}
export declare const remix: Remix;
