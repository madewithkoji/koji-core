import { Base, BackendConfigurationInput } from '../base';
/**
 * Configuration options for a new connection.
 */
export interface DispatchConfigurationInput {
    /** Name of the dispatch shard to use. If not specified, the client is added to a shard automatically. */
    shardName?: string | null;
    /** Total clients to allow on a shard before it is full (defaults to 100). When a shard is full, new clients are added to a new shard unless a different shard is explicitly set. */
    maxConnectionsPerShard?: number;
    /** Short-lived user token that identifies the client, so the server and other connected clients can send it secure messages. If the user token is not included, you can [[identify | identify the client]] after it is connected. */
    authorization?: string;
}
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
 * Additional data attached to a dispatch message.
 */
export interface DispatchMessageMetadata {
    /** Message latency in milliseconds. */
    latencyMs: number;
}
export declare type MessageHandlerCallback = 
/**
 * Function to handle a dispatch event. Invoked by the [[on]] listener.
 *
 * @param payload   Data payload sent with the fired event.
 * @param metadata  Object containing additional information about the event, including the message latency in milliseconds.
 */
(payload: {
    [index: string]: any;
}, metadata: DispatchMessageMetadata) => void;
/**
 * Information about a dispatch shard.
 */
export interface ShardInfo {
    /** Name of the dispatch shard. */
    shardName: string;
    /** Number of clients currently connected to the dispatch shard. */
    numConnectedClients: number;
}
/**
 * Connection details for a client. Returned when the client [[connect | connects to a dispatch shard]].
 */
export interface ConnectionInfo {
    /** ID of the connected client. */
    clientId?: string;
    /** Name of the dispatch shard that the client is connected to. */
    shardName: string;
}
/**
 * Implements a real-time messaging dispatch system for the backend of your Koji app.
 */
export declare class Dispatch extends Base {
    private authToken?;
    private initialConnection;
    private isConnected;
    private eventHandlers;
    private messageQueue;
    private ws;
    /**
     * Instantiates the Dispatch class.
     *
     * @param   config
     *
     * @example
     * ```javascript
     * const dispatch = new KojiBackend.Dispatch({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Gets information about the active dispatch shards.
     *
     * @return        Array of objects containing information about the dispatch shards.
     *
     * @example
     * ```javascript
     * const shardInfo = await dispatch.info();
     * ```
     */
    info(): Promise<ShardInfo>;
    /**
     * Connects a client to a dispatch shard.
     *
     * @param config    Configuration options for the connection.
     *
     * @return          Connection details, including the client ID and shard name.
     *
     * @example
     * ```javascript
     * const myInfo = await dispatch.connect({
     *  maxConnectionsPerShard: '25',
     *  authorization: token
     * });
     * ```
     */
    connect(config?: DispatchConfigurationInput): Promise<ConnectionInfo>;
    /**
     * Handles a message event.
     *
     * @param     data        JSON object containing eventName, latencyMS, and payload.
     * @param     eventName   PlatformEvents enum value.
     * @param     latencyMS   Latency in milliseconds.
     * @param     payload     Client object.
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
     * Sets a listener for a specific event, and invokes a callback function when the event is dispatched over the shard.
     *
     * @param     eventName     Name of the event to subscribe to.
     * @param     callback      Function to invoke when the event is fired.
     *
     * @return                  Function to unsubscribe from the event listener.
     *
     * @example
     * ```javascript
     * unsubscribeEvent = dispatch.on('eventName', callbackFunction);
     * ```
     */
    on(eventName: string, callback: MessageHandlerCallback): Function;
    /**
     * Identifies a connected client, which enables the server and other connected clients to send it secure messages.
     *
     * @param     authToken     Short-lived user token for the connected client. To get a user token, use {@doclink core-frontend-identity#getToken | Identity.getToken}.
     *
     * @example
     * ```javascript
     * const authToken = await identity.getToken();
     * dispatch.identify(authToken.token);
     * ```
     */
    identify(authToken: string): void;
    /**
     * Emits the named event to the specified recipients or to all clients.
     *
     * @param     eventName     Name of the event.
     * @param     payload       Object of key-value pair data to send as a message payload.
     * @param     recipients    List of clients to receive the event. If this parameter is not included, the event is sent to all clients on the current shard.
     *
     * @example
     * ```javascript
     * dispatch.emitEvent('myEvent', myDataPayload);
     * ```
     */
    emitEvent(eventName: string, payload: {
        [index: string]: any;
    }, recipients?: string[]): void;
    /**
     * Disconnects the client from the dispatch shard.
     *
     * @example
     * ```javascript
     * dispatch.disconnect();
     * ```
     */
    disconnect(): void;
}
