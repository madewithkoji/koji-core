import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

import {
  CaptureMessage,
  VerboseCapture,
  CaptureStatus,
  CaptureResult,
  CaptureAudioOptions,
  ExtendedMediaResult,
  CaptureColorOptions,
  CaptureCustomOptions,
  CaptureFileOptions,
  CaptureImageOptions,
  CaptureLinkOptions,
  CaptureMediaOptions,
  CaptureRangeOptions,
  CaptureSelectOptions,
  CaptureVideoOptions,
} from './model';

/**
 * Captures user input on the frontend of your Koji.
 */
export class Capture extends KojiBridge {
  /**
   * Map capture data to a verbose result.
   *
   * @param data Capture data returned by the platform.
   */
  private pickVerboseResultFromMessage(
    data: CaptureMessage<any>,
  ): VerboseCapture {
    if (data.status !== CaptureStatus.SUCCEEDED) {
      return {
        captureStatus: data.status,
        captureType: data.type,
        result: null,
        resultMetadata: null,
      };
    }

    if (data.result && typeof data.result === 'object') {
      const { url, ...resultMetadata } = data.result;

      return {
        captureStatus: data.status,
        captureType: data.type,
        result: url,
        resultMetadata,
      };
    }

    return {
      captureStatus: data.status,
      captureType: data.type,
      result: data.result,
      resultMetadata: {},
    };
  }

  /**
   * Map any non-successful capture data to a null return.
   *
   * @param data Capture data returned by the platform.
   */
  private pickResultFromMessage(data: CaptureMessage<any>): CaptureResult {
    if (data.status !== CaptureStatus.SUCCEEDED) {
      return null;
    }

    return data.result;
  }

  /**
   * Map `initialValue` to `value`, the key where the platform expects to see the initialValue in a postMessage.
   *
   * @param options Initial capture options passed by the user.
   */
  private transformInitialValueOptions(options: any): any {
    const { initialValue, ...transformedOptions } = options;

    if (initialValue) transformedOptions.value = initialValue;

    return transformedOptions;
  }

  /**
   * Prompts the user to select a sound by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting a sound.
   *
   * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the audio asset as a string.
   * @return         URL to the audio asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const audio = await Koji.ui.capture.audio();
   *
   * // Hide asset packs and return an object
   * const audio = await Koji.ui.capture.audio({ hideExtensions: true }, true);
   * ```
   */
  audio(options: CaptureAudioOptions, verbose: true): Promise<VerboseCapture>;
  audio(options?: CaptureAudioOptions, verbose?: false): Promise<string>;
  audio(
    options: CaptureAudioOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async audio(
    options: CaptureAudioOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> =
        await this.sendMessageAndAwaitResponse(
          {
            kojiEventName: 'Koji.Capture',
            data: {
              type: 'media',
              options: {
                acceptOnly: ['audio'],
                audioOptions: options,
                returnType: 'extended',
              },
            },
          },
          'Koji.CaptureSuccess',
        );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            acceptOnly: ['audio'],
            audioOptions: options,
            returnType: 'url',
          },
        },
      },
      'Koji.CaptureSuccess',
    );

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select a color, either from a swatch or by entering a color code. Supports HEX, RGB, or HSL by default. Supports RBGA or HSLA, if transparency is enabled in the capture options.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the color code as a string.
   * @return          Color code as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const color = await Koji.ui.capture.color();
   *
   * // Enable transparency and return an object
   * const color = await Koji.ui.capture.color({ allowAlpha: true }, true);
   * ```
   */
  color(options: CaptureColorOptions, verbose: true): Promise<VerboseCapture>;
  color(options?: CaptureColorOptions, verbose?: false): Promise<string | null>;
  color(
    options: CaptureColorOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async color(
    options: CaptureColorOptions = {},
    verbose: boolean = false,
  ): Promise<CaptureResult> {
    const transformedOptions = this.transformInitialValueOptions(options);

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'color',
          options: transformedOptions,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select a value from a custom control. To build a custom control, use the {@doclink withkoji-custom-vcc-sdk | @withkoji/custom-vcc-sdk package}.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the value captured by the custom control.
   * @return          Color code as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const music = await Koji.ui.capture.custom({ name: 'scloud' });
   * ```
   */
  custom(options: CaptureCustomOptions, verbose: true): Promise<VerboseCapture>;
  custom(options?: CaptureCustomOptions, verbose?: false): Promise<any>;
  custom(
    options: CaptureCustomOptions,
    verbose?: boolean,
  ): Promise<any | VerboseCapture>;
  @client
  public async custom(
    options: CaptureCustomOptions = {},
    verbose: boolean = false,
  ): Promise<any | VerboseCapture> {
    const { name, url, ...typeOptions } = options;

    if (!name && !url) {
      throw new Error(
        'Please supply the custom name or url for the Custom VCC you would like to load.',
      );
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: `custom<${name || url}>`,
          options: typeOptions,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  /**
   * Prompts the user to upload a file of any type.
   * Use this method to allow the user to upload raw files in their original format.
   * For example, to capture high-resolution images for download rather than for display in a browser.
   *
   * To apply automatic transcoding and transformations for specific file types, use the associated method.
   * See [[image]], [[video]], [[audio]], or [[media]].
   *
   * To provide a custom upload experience or to upload media created or captured during the template experience, use {@doclink core-frontend-ui-upload#uploadFile | Upload.uploadFile}.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the file as a string.
   * @return          URL to the file as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const file = await Koji.ui.capture.file();
   *
   * // Return an object
   * const file = await Koji.ui.capture.file({}, true);
   * ```
   */
  file(options: CaptureFileOptions, verbose: true): Promise<VerboseCapture>;
  file(options?: CaptureFileOptions, verbose?: false): Promise<string>;
  file(options: CaptureFileOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async file(
    options: CaptureFileOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> =
        await this.sendMessageAndAwaitResponse(
          {
            kojiEventName: 'Koji.Capture',
            data: {
              type: 'media',
              options: {
                acceptOnly: ['file'],
                fileOptions: options,
                returnType: 'extended',
              },
            },
          },
          'Koji.CaptureSuccess',
        );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            acceptOnly: ['file'],
            fileOptions: options,
            returnType: 'url',
          },
        },
      },
      'Koji.CaptureSuccess',
    );
    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select an image by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting an image.
   *
   * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the image asset as a string.
   * @return          URL to the image asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const image = await Koji.ui.capture.image();
   *
   * // Hide asset packs and return an object
   * const image = await Koji.ui.capture.image({ hideExtensions: true }, true);
   * ```
   */
  image(options: CaptureImageOptions, verbose: true): Promise<VerboseCapture>;
  image(options?: CaptureImageOptions, verbose?: false): Promise<string>;
  image(
    options: CaptureImageOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async image(
    options: CaptureImageOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> =
        await this.sendMessageAndAwaitResponse(
          {
            kojiEventName: 'Koji.Capture',
            data: {
              type: 'media',
              options: {
                acceptOnly: ['image'],
                imageOptions: options,
                returnType: 'extended',
              },
            },
          },
          'Koji.CaptureSuccess',
        );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            acceptOnly: ['image'],
            imageOptions: options,
            returnType: 'url',
          },
        },
      },
      'Koji.CaptureSuccess',
    );

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to paste an external URL, create a new Koji from a template, or select an existing
   * Koji from their profile.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL as a string.
   *
   * @return          URL as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   * @example
   * ```javascript
   * const link = await Koji.ui.capture.link();
   *
   * // Return an object
   * const link = await Koji.ui.capture.link({}, true);
   * ```
   */
  link(options: CaptureLinkOptions, verbose: true): Promise<VerboseCapture>;
  link(options?: CaptureLinkOptions, verbose?: false): Promise<string>;
  link(options: CaptureLinkOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async link(
    options: CaptureLinkOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'link',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select an image, file, audio, or video by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method to allow the user to select from more than one type of media with a single control. For example, allow the user to select an image or a video. You can limit the types of media to allow and configure options for each allowed type.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns only the value of the media capture.
   * @return          Value of the media capture, which is either the URL to the media as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const media = await Koji.ui.capture.media();
   *
   * // Limit to image or video, hide asset packs,
   * // return an object with extended metadata, transcode videos for HLS
   * const media = await Koji.ui.capture.media({
   *    acceptOnly: ['image', 'video'],
   *    hideExtensions: true,
   *    videoOptions: { hls: true }
   *  }, true);
   * ```
   */
  media(options: CaptureMediaOptions, verbose: true): Promise<VerboseCapture>;
  media(options?: CaptureMediaOptions, verbose?: false): Promise<string>;
  media(
    options: CaptureMediaOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async media(
    options: CaptureMediaOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> =
        await this.sendMessageAndAwaitResponse(
          {
            kojiEventName: 'Koji.Capture',
            data: {
              type: 'media',
              options: {
                ...options,
                returnType: 'extended',
              },
            },
          },
          'Koji.CaptureSuccess',
        );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            ...options,
            returnType: 'url',
          },
        },
      },
      'Koji.CaptureSuccess',
    );

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select a numeric value within a certain range.
   * You can configure the minimum value, maximum value, and default increment, as well as an initial value for the control.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the numeric value as a string.
   * @return          Numeric value as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const size = await Koji.ui.capture.range();
   *
   * // Return an object
   * const size = await Koji.ui.capture.range({ min: 0, max: 60, step: 3 }, true);
   * ```
   */
  range(options: CaptureRangeOptions, verbose: true): Promise<VerboseCapture>;
  range(options?: CaptureRangeOptions, verbose?: false): Promise<number>;
  range(
    options: CaptureRangeOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async range(
    options: CaptureRangeOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    const transformedOptions = this.transformInitialValueOptions(options);

    const data: CaptureMessage<number> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'range',
          options: transformedOptions,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select from a predefined list of options.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the option as a string.
   * @return         Value of the predefined option as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const option = await Koji.ui.capture.select();
   *
   * // Select from three options
   * const option = await Koji.ui.capture.select(
   *  { options: [
   *    { value: "one", label: "Option one" },
   *    { value: "two", label: "Option two" },
   *    { value: "three", label: "Option three" }],
   *    placeholder: "Choose an option"});
   * ```
   */
  select(options: CaptureSelectOptions, verbose: true): Promise<VerboseCapture>;
  select(options?: CaptureSelectOptions, verbose?: false): Promise<string>;
  select(
    options: CaptureSelectOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async select(
    options: CaptureSelectOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    const transformedOptions = this.transformInitialValueOptions(options);

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'select',
          options: transformedOptions,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to upload a video. Use this method when you want to limit the user to uploading a video file.
   *
   * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the video asset as a string.
   * @return          URL to the video asset as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const video = await Koji.ui.capture.video();
   *
   * // Transcode for HLS and return an object
   * const video = await Koji.ui.capture.video({ hls: true }, true);
   * ```
   */
  video(options: CaptureVideoOptions, verbose: true): Promise<VerboseCapture>;
  video(options?: CaptureVideoOptions, verbose?: false): Promise<string>;
  video(
    options: CaptureVideoOptions,
    verbose?: boolean,
  ): Promise<CaptureResult>;
  @client
  public async video(
    options: CaptureVideoOptions = {},
    verbose?: boolean,
  ): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> =
        await this.sendMessageAndAwaitResponse(
          {
            kojiEventName: 'Koji.Capture',
            data: {
              type: 'media',
              options: {
                acceptOnly: ['video'],
                returnType: 'extended',
                videoOptions: options,
              },
            },
          },
          'Koji.CaptureSuccess',
        );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            acceptOnly: ['video'],
            returnType: 'url',
            videoOptions: options,
          },
        },
      },
      'Koji.CaptureSuccess',
    );

    return this.pickResultFromMessage(data);
  }
}

export const capture = new Capture();
