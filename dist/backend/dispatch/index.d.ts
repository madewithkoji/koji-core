import { Base } from '../base';
/**
 * Defines constants for Koji platform events.
 */
export declare enum PlatformEvents {
    CONNECTED = "@@KOJI_DISPATCH/CONNECTED",
    CONNECTED_CLIENTS_CHANGED = "@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED",
    IDENTIFY = "@@KOJI_DISPATCH/IDENTIFY",
    SET_USER_INFO = "@@KOJI_DISPATCH/SET_USER_INFO"
}
/**
 * Defines a MessageHandler interface.
 */
export interface MessageHandler {
    id: string;
    eventName: string;
    callback: MessageHandlerCallback;
}
/**
 * Implements the callback function for the MessageHandler interface.
 */
export declare type MessageHandlerCallback = (payload: {
    [index: string]: any;
}, metadata: {
    latencyMs?: number;
}) => void;
/**
 * Defines a ShardInfo interface.
 */
export interface ShardInfo {
    shardName: string;
    numConnectedClients: number;
}
/**
 * Defines a ConnectionInfo interface.
 */
export interface ConnectionInfo {
    clientId?: string;
    shardName: string;
}
/**
 * Implements a dispatch system for the backend of your Koji. For more information, see [[https://developer.withkoji.com/reference/packages/withkoji-dispatch-package | the Koji dispatch package reference]].
 */
export declare class Dispatch extends Base {
    private authToken?;
    private initialConnection;
    private isConnected;
    private eventHandlers;
    private messageQueue;
    private ws;
    /**
     * Gets shard info for the current project.
     *
     * @return                   Shard info in the form of an array.
     *
     * @example
     * ```javascript
     * const myInfo = await dispatch.info('myCollection');
     * ```
     */
    info(): Promise<ShardInfo[]>;
    /**
     * Creates a shard connection.
     *
     * @param     shardName     Name of the shard.
     * @param     maxConnectionsPerShard   Maximum connections per Shard (defaults to 100).
     * @param     authorization Authorization credentials.
     *
     * @return                   ConnectionInfo object.
     *
     * @example
     * ```javascript
     * const myInfo = await dispatch.connect('myShard', 100, authorization);
     * ```
     */
    private connect;
    /**
     * Handles a message event.
     *
     * @param     data        JSON object containing eventName, latencyMS, and payload.
     * @param     eventName   PlatformEvents enum value
     * @param     latencyMS   Latency in milliseconds
     * @param     payload     Client object
     *
     * @example
     * ```javascript
     * dispatch.handleMessage(PlatformEvents.CONNECTED, 1000, client);
     * ```
     */
    private handleMessage;
    /**
     * Reconnects a shard.
     *
     * @example
     * ```javascript
     * dispatch.handleReconnect();
     * ```
     */
    private handleReconnect;
    /**
     * Handles maximum.
     *
     * @example
     * ```javascript
     * dispatch.handleMaximum();
     * ```
     */
    private handleMaximum;
    /**
     * Cleans up when connection is closed.
     *
     * @example
     * ```javascript
     * dispatch.handleClose();
     * ```
     */
    private handleClose;
    /**
     * Prints error message to console.
     *
     * @param     e    Event that generated the error.
     *
     * @example
     * ```javascript
     * dispatch.handleError(e);
     * ```
     */
    private handleError;
    /**
     * Assigns a callback function to an event.
     *
     * @param     eventName     Name of event.
     * @param     callback      Callback function.
     *
     * @example
     * ```javascript
     * dispatch.on('eventName', callbackFunction);
     * ```
     */
    on(eventName: string, callback: MessageHandlerCallback): Function;
    /**
     * Emit SET_USER_INFO event.
     *
     * @param     userInfo     Object containing an array of user info.
     *
     * @example
     * ```javascript
     * dispatch.setUserInfo({['user info']});
     * ```
     */
    setUserInfo(userInfo: {
        [index: string]: any;
    }): void;
    /**
     * Emit IDENTIFY event.
     *
     * @param     authToken     Authorization token.
     *
     * @example
     * ```javascript
     * dispatch.identify(token);
     * ```
     */
    identify(authToken: string): void;
    /**
     * Emit event.
     *
     * @param     eventName     Name of event.
     * @param     payload       Array of values to be included in event message.
     * @param     recipients    One or more event recipients.
     *
     * @example
     * ```javascript
     * dispatch.emitEvent('click', [id:1]);
     * ```
     */
    emitEvent(eventName: string, payload: {
        [index: string]: any;
    }, recipients?: string[]): void;
    /**
     * Close connection.
     *
     * @example
     * ```javascript
     * dispatch.disconnect();
     * ```
     */
    disconnect(): void;
}
