import { Base, BackendConfigurationInput } from '../base';
export declare enum AuthRoutes {
    GET_GRANT = "/v1/apps/auth/consumer/getGrantForToken",
    GET_ROLE = "/v1/apps/auth/consumer/getRoleForToken",
    PUSH_NOTIFICATION = "/v1/apps/auth/consumer/pushNotification"
}
export declare enum UserRole {
    ADMIN = "admin",
    UNKNOWN = "unknown",
    USER = "user"
}
export interface User {
    id: string;
    attributes: {
        [index: string]: any;
    };
    dateCreated: string;
    pushNotificationsEnabled: boolean;
    role: UserRole;
}
export interface PushNotification {
    appName: string;
    icon: string;
    message: string;
    ref?: string;
}
export declare class Identity extends Base {
    private rootPath;
    private rootHeaders;
    constructor(config: BackendConfigurationInput);
    pushNotificationToUser(userId: string, notification: PushNotification): Promise<void>;
    pushNotificationToOwner(notification: PushNotification): Promise<void>;
    resolveUserFromToken(token: UserToken): Promise<User>;
}
