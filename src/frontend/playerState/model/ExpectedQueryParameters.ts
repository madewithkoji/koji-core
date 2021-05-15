import {
  PlayerStateContext,
  PlayerStateReceiptType,
  PlayerPresentationStyle,
} from '../types';

/**
 * URL query parameters that describe the current state of the Koji player.
 */
export interface ExpectedQueryParameters {
  context?: PlayerStateContext;
  'dynamic-receipt'?: PlayerStateReceiptType;
  presentationStyle?: PlayerPresentationStyle;
}
