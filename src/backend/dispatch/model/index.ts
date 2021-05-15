import { MessageHandlerCallback } from '../types';

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
export interface DispatchOptions {
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

/**
 * Additional data attached to a dispatch message.
 */
export interface DispatchMessageMetadata {
  /** Message latency in milliseconds. */
  latencyMs: number;
}

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
