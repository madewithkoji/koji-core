import { KojiBridge } from '../kojiBridge';
export declare type AuthGrantCapability = 'push_notifications' | 'username';
export declare class Identity extends KojiBridge {
    getToken(): Promise<UserToken>;
    checkGrants(grants?: AuthGrantCapability[]): Promise<boolean>;
    requestGrants(grants?: AuthGrantCapability[], usageDescription?: string): Promise<UserToken>;
}
export declare const identity: Identity;
