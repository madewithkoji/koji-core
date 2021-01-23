import { KojiBridge } from '../../kojiBridge';
export interface PresentConfirmationOptions {
    title?: string;
    message?: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}
export interface PresentAlertOptions {
    title?: string;
    message?: string;
}
export declare class Present extends KojiBridge {
    confirmation(options?: PresentConfirmationOptions): Promise<boolean>;
    alert(options?: PresentConfirmationOptions): void;
}
export declare const present: Present;
