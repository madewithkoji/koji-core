import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

export interface CaptureOptions {
  /** Indicates whether to return additional metadata about the color. By default (`false`), returns the color code as a string.  */
  verbose?: boolean;
}

export interface CaptureColorOptions extends CaptureOptions {
  /** Indicates whether to support transparency (`false`, by default). */
  allowAlpha?: boolean;
}

export interface CaptureImageOptions extends CaptureOptions {
  hideExtensions?: boolean;
}

export type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';

export type CaptureMediaReturnType = 'url' | 'extended';

export interface CaptureMediaVideoOptions {
  hls?: boolean;
  estimatePoses: boolean;
}

export interface CaptureMediaImageOptions {
  width?: number;
}

export interface CaptureMediaOptions extends CaptureOptions {
  acceptOnly?: CaptureMediaAcceptOnly[];
  returnType?: CaptureMediaReturnType;
  hideExtensions?: boolean;
  videoOptions?: CaptureMediaVideoOptions;
  imageOptions?: CaptureMediaImageOptions;
}

export interface CaptureValue {
  event: string;
  result: string;
  status: string;
  type: string;
}

export interface ExtendedCaptureMediaVideoMetadata {
  thumbnailUrl: string;
}

export interface ExtendedCaptureMediaAudioMetadata {
  durationSeconds: number;
}

export interface ExtendedCaptureMediaImageMetadata {
  naturalWidth: number;
  naturalHeight: number;
}

export interface ExtendedCaptureMediaValue {
  url: string;
  type: string;
  sizeBytes: string;
  videoMetadata: ExtendedCaptureMediaVideoMetadata;
  audioMetadata: ExtendedCaptureMediaAudioMetadata;
  imageMetadata: ExtendedCaptureMediaImageMetadata;
}

export interface CaptureRangeOptions extends CaptureOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface CaptureSelectOptionsOption {
  value: string;
  label?: string;
}

export interface CaptureSelectOptions extends CaptureOptions {
  placeholder?: string;
  options?: CaptureSelectOptionsOption[];
}

export interface CaptureSoundOptions extends CaptureOptions {
  hideExtensions?: boolean;
}

export interface CaptureVideoOptions extends CaptureOptions {
  hls?: boolean;
  estimatePoses?: boolean;
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
   * const color = await Koji.ui.capture.color();
   * ```
   */
  @client
  async color(options: CaptureColorOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
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

  @client
  async file(options: CaptureOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'file',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async image(options: CaptureImageOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'image',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async koji(options: CaptureOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'koji',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async media(options: CaptureMediaOptions = {}): Promise<string | CaptureValue | ExtendedCaptureMediaValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async range(options: CaptureRangeOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'range',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async select(options: CaptureSelectOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'select',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async sound(options: CaptureSoundOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'sound',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }

  @client
  async video(options: CaptureVideoOptions = {}): Promise<string | CaptureValue> {
    const data: CaptureValue = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'video',
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
