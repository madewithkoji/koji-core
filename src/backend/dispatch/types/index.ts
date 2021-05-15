import { DispatchMessageMetadata } from '../model';

export type MessageHandlerCallback =
  /**
   * Function to handle a dispatch event. Invoked by the [[on]] listener.
   *
   * @param payload   Data payload sent with the fired event.
   * @param metadata  Object containing additional information about the event, including the message latency in milliseconds.
   */
  (
    payload: { [index: string]: any },
    metadata: DispatchMessageMetadata,
  ) => void;
