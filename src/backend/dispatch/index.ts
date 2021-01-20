/**
 * Some quick notes:
 *
 * Moved latencyMs to a metadata property that can be picked up on a callback. Writing the
 * most recent latency to the class felt less helpful from a debugging standpoint
 *
 * Similarly, connected clients should be listened for instead of doing a lookup.
 *
 * Things like shardName and clientId are returned upon instantiation.
 */
import { v4 as uuidv4 } from 'uuid';
import Sockette from 'sockette';
import axios from 'axios';
import { Base, BackendConfigurationInput } from '../base';

interface DispatchConfigurationInput extends BackendConfigurationInput {
  shardName?: string | null;
  maxConnectionsPerShard?: number;
  authorization?: string;
}

interface DispatchOptions {
  projectId: string;
  projectToken?: string;
  shardName?: string | null;
  maxConnectionsPerShard?: number;
  authorization?: string;
  [index: string]: any;
}

export enum PlatformEvents {
  CONNECTED = '@@KOJI_DISPATCH/CONNECTED',
  CONNECTED_CLIENTS_CHANGED = '@@KOJI_DISPATCH/CONNECTED_CLIENTS_CHANGED',
  IDENTIFY = '@@KOJI_DISPATCH/IDENTIFY',
  SET_USER_INFO = '@@KOJI_DISPATCH/SET_USER_INFO',
}

export interface MessageHandler {
  id: string;
  eventName: string;
  callback: MessageHandlerCallback;
}

export type MessageHandlerCallback = (payload: { [index: string]: any }, metadata: { latencyMs?: number }) => void;

export interface ShardInfo {
  shardName: string;
  numConnectedClients: number;
}

export interface ConnectionInfo {
  clientId?: string;
  shardName: string;
}

export class Dispatch extends Base {
  private authToken?: string;
  private url: string;

  private initialConnection: boolean = false;
  private isConnected: boolean = false;
  private eventHandlers: MessageHandler[] = [];
  private messageQueue: string[] = [];
  private ws: Sockette | null = null;

  constructor(config: DispatchConfigurationInput) {
    super(config);

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

    this.authToken = config.authorization;
    this.url = `${ApiEndpoints.DISPATCH_PRODUCTION}?${params.join('&')}`;
  }

  async info(): Promise<ShardInfo[]> {
    const { data } = await axios.get(`https://dispatch-info.api.gokoji.com/info/${this.projectId}`);
    return data.result;
  }

  async connect(): Promise<ConnectionInfo> {
    return new Promise((resolve) => {
      if (this.ws) {
        return;
      }

      // Create a socket connection to the dispatch server
      this.ws = new Sockette(this.url, {
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

  handleMessage({ data }: { data: string }, resolve: Function) {
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

  handleReconnect() {
    this.isConnected = true;
    this.messageQueue = this.messageQueue.reduce((acc, cur) => {
      if (this.ws) {
        this.ws.send(cur);
      }
      return acc;
    }, []);
  }

  handleMaximum() {}

  handleClose() {
    this.isConnected = false;
  }

  handleError(e) {
    console.error('[Koji Dispatch] error', e);
  }

  on(eventName: string, callback: MessageHandlerCallback): Function {
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

  setUserInfo(userInfo: { [index: string]: any }) {
    this.emitEvent(PlatformEvents.SET_USER_INFO, userInfo);
  }

  identify(authToken: string) {
    this.emitEvent(PlatformEvents.IDENTIFY, {
      token: authToken,
    });
  }

  emitEvent(eventName: string, payload: { [index: string]: any }, recipients?: string[]) {
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

  disconnect() {
    if (this.ws) this.ws.close();
    this.ws = null;
  }
}
