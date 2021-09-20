/**
 * Configuration options for a new connection.
 */
export interface DispatchConfigurationInput {
    /** Name of the dispatch shard to use. If not specified, the client is added to a shard automatically. */
    shardName?: string | null;
    /** Total clients to allow on a shard before it is full (defaults to 100). When a shard is full, new clients are added to a new shard unless a different shard is explicitly set. */
    maxConnectionsPerShard?: number;
    /** Short-lived user token that identifies the client, so the server and other connected clients can send it secure messages. If this value is not included, you can [[identify | identify the client]] after it is connected. */
    authorization?: string;
}
/**
 * Defines a DispatchOptions interface.
 */
export interface DispatchOptions {
    projectId?: string;
    shardName?: string | null;
    maxConnectionsPerShard?: number;
    authorization?: string;
    [index: string]: any;
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
    callback: MessageHandlerCallback | ConnectedClientsChangedHandlerCallback;
}
/**
 * Information about a client that is connected to a shard.
 */
export interface ConnectedClient {
    /** Unique identifier for the client. */
    clientId: string;
    /** Timestamp of the client's most recent ping (network activity). */
    lastPing: number;
}
export declare type ConnectedClientsChangedHandlerCallback = 
/**
 * Function to handle a dispatch event for a new or updated client connection. Invoked by the [[onConnectedClientsChanged]] listener.
 *
 * @param connectedClients   Array of information about the connected clients in the shard.
 */
(connectedClients: ConnectedClient[]) => void;
export declare type MessageHandlerCallback = 
/**
 * Function to handle a dispatch event. Invoked by the [[on]] listener.
 *
 * @param payload   Data payload sent with the fired event.
 * @param metadata  Object containing additional information about the event, including the message latency in milliseconds.
 */
(payload: {
    [index: string]: any;
}, metadata: {
    latencyMs?: number;
}) => void;
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
 * Implements a dispatch system for real-time communication on the frontend of your Koji app.
 */
export declare class Dispatch {
    private authToken?;
    private projectId?;
    private initialConnection;
    private isConnected;
    private eventHandlers;
    private messageQueue;
    private ws;
    /**
     * Gets information about the active dispatch shards.
     *
     * @return    Array of objects containing information about the dispatch shards.
     *
     * @example
     * ```javascript
     * const shardInfo = await Koji.dispatch.info();
     * ```
     */
    info(): Promise<ShardInfo>;
    /**
     * Sets the project ID for the dispatch service.
     *
     * @param     projectId     Unique identifier for the Koji project.
     *
     * @example
     * ```javascript
     * Koji.dispatch.setProjectId(myProject);
     * ```
     */
    setProjectId(projectId: string): void;
    /**
     * Connects a client to a dispatch shard.
     *
     * @param     config    Configuration options for the connection.
     *
     * @return              Connection details, including the client ID and shard name.
  
     *
     * @example
     * ```javascript
     * const myInfo = await Koji.dispatch.connect({
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
     * Sets a listener for a specific event, and invokes a callback function when the event is dispatched over the shard.
     *
     * @param     eventName     Name of the event to subscribe to.
     * @param     callback      Function to invoke when the event is fired.
     *
     * @return                  Function to unsubscribe from the event listener.
     *
     * @example
     * ```javascript
     * unsubscribeEvent = Koji.dispatch.on('eventName', callbackFunction);
     * ```
     */
    on(eventName: string, callback: MessageHandlerCallback): Function;
    /**
     * Sets a listener for changes to connected clients, and invokes a callback function when the event is dispatched over the shard.
     * A change occurs whenever any client connects, disconnects, or updates their user information with [[setUserInfo]].
     *
     * @param     callback      Function to invoke when the event is fired.
     *
     * @return                  Function to unsubscribe from the event listener.
     *
     * @example
     * ```javascript
     * unsubscribeEvent = Koji.dispatch.onConnectedClientsChanged(callbackFunction);
     * ```
     */
    onConnectedClientsChanged(callback: ConnectedClientsChangedHandlerCallback): Function;
    /**
     * Sets user information that is available in the [[onConnectedClientsChanged]] listener.
     *
     * @param     userInfo      Data to set for the client's user information.
     *
     * @example
     * ```javascript
     * Koji.dispatch.setUserInfo({ avatar: userAvatar });
     * ```
     */
    setUserInfo(userInfo: {
        [index: string]: any;
    }): void;
    /**
     * Identifies a connected client, which enables the server and other connected clients to send it secure messages.
     *
     * @param     authToken     Short-lived user token for the connected client. To get a user token, use {@doclink core-frontend-identity#getToken | Identity.getToken}.
     *
     * @example
     * ```javascript
     * const { userToken, presumedRole, presumedAttributes  } = await Koji.identity.getToken();
     * Koji.dispatch.identify(userToken);
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
     * Koji.dispatch.emitEvent('myEvent', myDataPayload);
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
     * Koji.dispatch.disconnect();
     * ```
     */
    disconnect(): void;
}
export declare const dispatch: Dispatch;
