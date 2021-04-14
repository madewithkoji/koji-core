import { v4 as uuidv4 } from 'uuid';
import Sockette from 'sockette';
import axios from 'axios';
import { Base, BackendConfigurationInput } from '../base';

const unsafeGlobal: any = global;
unsafeGlobal.WebSocket = require('isomorphic-ws');

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
 * Defines a DispatchOptions interface.
 */
interface DispatchOptions {
  projectId: string;
  projectToken?: string;
  shardName?: string | null;
  maxConnectionsPerShard?: number;
  authorization?: string;
  [index: string]: any;
}

/**
 * Defines constants for Koji platform events.
 */
export enum PlatformEvents {
  CONNECTED = '@@KOJI_DISPATCH/CONNECTED',
  CONNECTED_CLIENTS_CHANGED = '@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED',
  IDENTIFY = '@@KOJI_DISPATCH/IDENTIFY',
  SET_USER_INFO = '@@KOJI_DISPATCH/SET_USER_INFO',
}

/**
 * Defines a MessageHandler interface.
 */
export interface MessageHandler {
  id: string;
  eventName: string;
  callback: MessageHandlerCallback;
}

export type MessageHandlerCallback =
/**
 * Function to handle a dispatch event. Invoked by the [[on]] listener.
 *
 * @param payload   Data payload sent with the fired event.
 * @param metadata  Object containing additional information about the event, including the message latency in milliseconds.
 */
(payload: { [index: string]: any }, metadata: { latencyMs?: number }) => void;

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
 * Implements a real-time messaging dispatch system for the backend of your Koji.
 */
export class Dispatch extends Base {
  private authToken?: string;
  private initialConnection: boolean = false;
  private isConnected: boolean = false;
  private eventHandlers: MessageHandler[] = [];
  private messageQueue: string[] = [];
  private ws: Sockette | null = null;

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
  public constructor(config: BackendConfigurationInput) {
    super(config);
  }

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
  public async info(): Promise<ShardInfo[]> {
    const { data } = await axios.get(`https://dispatch-info.api.gokoji.com/info/${this.projectId}`);
    return (data || [])[0];
  }

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
  public async connect(config: DispatchConfigurationInput = {}): Promise<ConnectionInfo> {
    return new Promise((resolve) => {
      if (this.ws) {
        return;
      }

      const options: DispatchOptions = {
        projectId: this.projectId,
        projectToken: this.projectToken,
        shardName: config.shardName,
        maxConnectionsPerShard: config.maxConnectionsPerShard || 100,
        authorization: config.authorization,
      };

      const params: string[] = Object.keys(options).reduce((acc: string[], cur) => {
        if (options[cur]) {
          acc.push(`${cur}=${encodeURIComponent(options[cur])}`);
        }
        return acc;
      }, []);

      const url = `wss://dispatch.api.gokoji.com?${params.join('&')}`;

      this.authToken = config.authorization;

      // Create a socket connection to the dispatch server
      this.ws = new Sockette(url, {
        timeout: 5e3,
        maxAttempts: 10,
        onmessage: (e) => this.handleMessage(e, resolve),
        onreconnect: () => this.handleReconnect(),
        onmaximum: () => this.handleMaximum(),
        onclose: () => this.handleClose(),
        onerror: (e) => this.handleError(e),
      });
    });
  }

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
  private handleMessage({ data }: { data: string }, resolve: Function) {
    const { eventName, latencyMs, payload } = JSON.parse(data || '{}');

    if (eventName === PlatformEvents.CONNECTED) {
      this.initialConnection = true;
      this.isConnected = true;
      if (this.authToken) this.identify(this.authToken);
      resolve({
        clientId: payload.clientId,
        shardName: payload.shardName,
      });
      return;
    }

    this.eventHandlers.forEach((handler) => {
      if (eventName === handler.eventName) {
        handler.callback(payload, { latencyMs });
      }
    });
  }

  /**
   * Reconnects a shard.
   *
   * @example
   * ```javascript
   * dispatch.handleReconnect();
   * ```
   */
  private handleReconnect() {
    this.isConnected = true;
    this.messageQueue = this.messageQueue.reduce((acc, cur) => {
      if (this.ws) {
        this.ws.send(cur);
      }
      return acc;
    }, []);
  }

  /**
   * Handles maximum.
   *
   * @example
   * ```javascript
   * dispatch.handleMaximum();
   * ```
   */
  private handleMaximum() {}

  /**
   * Cleans up when connection is closed.
   *
   * @example
   * ```javascript
   * dispatch.handleClose();
   * ```
   */
  private handleClose() {
    this.isConnected = false;
  }

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
  private handleError(e: Event) {
    console.error('[Koji Dispatch] error', e);
  }

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
  public on(eventName: string, callback: MessageHandlerCallback): Function {
    const handlerId = uuidv4();

    this.eventHandlers.push({
      id: handlerId,
      eventName,
      callback,
    });

    return () => {
      this.eventHandlers = this.eventHandlers.filter(({ id }) => id !== handlerId);
    };
  }

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
  public identify(authToken: string) {
    this.emitEvent(PlatformEvents.IDENTIFY, {
      token: authToken,
    });
  }

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
  public emitEvent(eventName: string, payload: { [index: string]: any }, recipients?: string[]) {
    const message = JSON.stringify({
      eventName,
      payload,
      recipients,
    });

    // Discard a long message
    if (message.length > 128e3) {
      throw new Error('Message is too long to be sent through Koji Dispatch. Messages must be less than 128kb');
    }

    // Check instantiation
    if (!this.initialConnection || !this.ws) {
      throw new Error('Please make sure you have called and awaited `connect()` before attempting to send a message');
    }

    // If the connection has dropped, push the message into a queue
    if (!this.isConnected) {
      this.messageQueue.push(message);
      return;
    }

    this.ws.send(message);
  }

  /**
   * Disconnects the client from the dispatch shard.
   *
   * @example
   * ```javascript
   * dispatch.disconnect();
   * ```
   */
  public disconnect() {
    if (this.ws) this.ws.close();
    this.ws = null;
  }
}
