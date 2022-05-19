import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { CaptureCustomOptions } from '../ui/capture';

export type SetPayload = any;

/**
 * Module for creating VCC Custom Controls
 */
export class VCC extends KojiBridge {
  /**
   * Gets the options that are passed to a custom control
   *
   * @return Object containing the options
   *
   * @example
   * ```javascript
   * const captureCustomOptions = await Koji.vcc.getOptions();
   * ```
   */
  @client
  public async getOptions(): Promise<CaptureCustomOptions> {
    const data = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: '@@koji/vcc/inbound/getOptions',
      },
      '@@koji/vcc/outbound/getOptions',
    );

    return data;
  }

  /**
   * Changes the value of a custom control
   *
   * @example
   * ```javascript
   * Koji.vcc.set("ANY VALUE")
   * ```
   */
  @client
  public set(payload: SetPayload) {
    this.sendMessage({
      kojiEventName: '@@koji/vcc/inbound/set',
      data: {
        payload,
      },
    });
  }

  /**
   * Commits the value of a custom control
   *
   * @example
   * ```javascript
   * Koji.vcc.finish()
   * ```
   */
  @client
  public finish() {
    this.sendMessage({
      kojiEventName: '@@koji/vcc/inbound/finish',
    });
  }
}

export const vcc = new VCC();
