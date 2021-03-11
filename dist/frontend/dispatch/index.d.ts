interface DispatchConfigurationInput {
    shardName?: string | null;
    maxConnectionsPerShard?: number;
    authorization?: string;
}
export declare enum PlatformEvents {
    CONNECTED = "@@KOJI_DISPATCH/CONNECTED",
    CONNECTED_CLIENTS_CHANGED = "@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED",
    IDENTIFY = "@@KOJI_DISPATCH/IDENTIFY",
    SET_USER_INFO = "@@KOJI_DISPATCH/SET_USER_INFO"
}
export interface MessageHandler {
    id: string;
    eventName: string;
    callback: MessageHandlerCallback;
}
export declare type MessageHandlerCallback = (payload: {
    [index: string]: any;
}, metadata: {
    latencyMs?: number;
}) => void;
export interface ShardInfo {
    shardName: string;
    numConnectedClients: number;
}
export interface ConnectionInfo {
    clientId?: string;
    shardName: string;
}
export declare class Dispatch {
    private authToken?;
    private projectId?;
    private initialConnection;
    private isConnected;
    private eventHandlers;
    private messageQueue;
    private ws;
    info(): Promise<ShardInfo[]>;
    setProjectId(projectId: string): void;
    connect(config?: DispatchConfigurationInput): Promise<ConnectionInfo>;
    private handleMessage;
    private handleReconnect;
    private handleMaximum;
    private handleClose;
    private handleError;
    on(eventName: string, callback: MessageHandlerCallback): Function;
    setUserInfo(userInfo: {
        [index: string]: any;
    }): void;
    identify(authToken: string): void;
    emitEvent(eventName: string, payload: {
        [index: string]: any;
    }, recipients?: string[]): void;
    disconnect(): void;
}
export declare const dispatch: Dispatch;
export {};
