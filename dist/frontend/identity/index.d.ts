import { KojiBridge } from '../kojiBridge';
export declare enum AuthGrantCapability {
    PUSH_NOTIFICATIONS = "push_notifications",
    USERNAME = "username"
}
export declare class Identity extends KojiBridge {
    getToken(): Promise<UserToken>;
    checkGrants(grants?: AuthGrantCapability[]): Promise<boolean>;
    requestGrants(grants?: AuthGrantCapability[], usageDescription?: string): Promise<UserToken>;
}
export declare const identity: Identity;
