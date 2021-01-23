import { KojiBridge } from '../../bridge';
import { client } from '../../@decorators/client';

interface ColorControlOptions {
  /** Indicates whether to support transparency (`false`, by default). */
  allowAlpha?: boolean;
  /** Indicates whether to return additional metadata about the color. By default (`false`), returns the color code as a string.  */
  verbose?: boolean;
}

interface Color {
  event: string;
  result: string;
  status: string;
  type: string;
}

export class Capture extends KojiBridge {
  /**
   * Prompts the user to select a color, either from a swatch or by entering a color code.
   * Supports HEX, RGB, or HSL by default, and RBGA or HSLA, if transparency is enabled.
   *
   * @param   options      {@link ColorControlOptions}
   * @return               [description]
   * @example
   * ```javascript
   * const color = await Koji.UI.Capture.color();
   * ```
   */
  @client
  async color(options: ColorControlOptions = {}): Promise<string | Color> {
    const data: Color = await this.postToPlatform(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'color',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }
}

export const capture = new Capture();
