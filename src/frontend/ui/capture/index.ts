import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';
import { FastlyOptions } from '../../../types';

/**
 * Result of a user input capture.
 */
export type CaptureResult = string | number | null | VerboseCapture;

/**
 * Extended result of a user input capture.
 */
export interface VerboseCapture {
  /** Whether the user completed the selection (`succeeded`) or exited the control without selecting a value (`cancelled`). */
  captureStatus: CaptureStatus;
  /** Capture method type (for example, `color` or `file`). */
  captureType: CaptureType;
  /** Value captured from the user. */
  result?: CaptureResult;
  /** Metadata associated with the captured result */
  resultMetadata?: ExtendedMediaResult | ExtendedLinkResult | null;
}

export interface CaptureMessage<T> {
  _idempotencyKey: string;
  event: string;
  result: T;
  status: CaptureStatus;
  type: CaptureType;
}

/** Whether the user completed the selection (`succeeded`) or exited the control without selecting a value (`cancelled`). */
export enum CaptureStatus {
  SUCCEEDED = 'succeeded',
  CANCELLED = 'cancelled',
}

/** Capture method types. */
export enum CaptureType {
  COLOR = 'color',
  FILE = 'file',
  IMAGE = 'image',
  LINK = 'link',
  MEDIA = 'media',
  RANGE = 'range',
  SELECT = 'select',
  SOUND = 'audio',
  VIDEO = 'video',
}

/**
 * Metadata for a [[media]] capture when the return type is set to `extended`.
 */
export interface ExtendedMediaResult {
  /** URL of the selected media file. */
  url?: string;
  /** Type of media: `image`, `video`, `audio`, or `file`. */
  type?: string;
  /** Size in bytes of the media file. */
  sizeBytes?: string;
  /** Metadata for a video file. */
  videoMetadata?: {
    /** URL for the video thumbnail. */
    thumbnailUrl: string;
  };
  /** Metadata for an audio file. */
  audioMetadata?: {
    /** Duration in seconds for an audio file. */
    durationSeconds: number;
  };
  /** Metadata for an image file. */
  imageMetadata?: {
    /** Natural width of the image in pixels. */
    naturalWidth: number;
    /** Natural height of the image in pixels. */
    naturalHeight: number;
  };
}

/**
 * Metadata for a [[link]] capture when the return type is set to `extended`.
 */
export interface ExtendedLinkResult {
  /** Full URL of the selected Koji or pasted link resource. */
  url: string;
  /** Sharing metadata title (`og:title`) of the content at the URL, if available. */
  title: string | null;
  /** Sharing metadata description (`og:description`) of the content at the URL, if available. */
  description: string | null;
  /** Sharing metadata image (`og:image`) of the content at the URL, if available. */
  thumbnailUrl: string | null;
  /** If the resource is a Koji, the Koji’s name, if available. */
  sourceName: string | null;
  /** If the resource is a Koji, the URL of the Koji’s thumbnail image, if available. */
  sourceThumbnailUrl: string | null;
}

/**
 * Configuration options for a [[custom]] capture.
 */
export interface CaptureCustomOptions {
  /** Short name for the custom control. */
  name?: string;
  /** URL where the custom control is hosted. */
  url?: string;
  /** Type options specific to the custom control. */
  typeOptions?: any;
}

/**
 * Configuration options for a [[color]] capture.
 */
export interface CaptureColorOptions {
  /** Indicates whether to support transparency (`false`, by default). */
  allowAlpha?: boolean;
  /** Default value for the color capture control. */
  initialValue?: string;
}

/**
 * Configuration options for an [[image]] capture.
 */
export interface CaptureImageOptions extends FastlyOptions {
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium images). */
  hideExtensions?: boolean;
}

/**
 * Configuration options for a [[file]] capture.
 */
export interface CaptureFileOptions {}

/**
 * Configuration options for a [[link]] capture.
 */
export interface CaptureLinkOptions {
  kojiTemplateId?: string;
}

/**
 * Configuration options for a [[range]] capture.
 */
export interface CaptureRangeOptions {
  /** Minimum value. Default is `0`. */
  min?: number;
  /** Maximum value. Default is `100`. */
  max?: number;
  /** Default increment/step size. Default is `1`. */
  step?: number;
  /** Default value for the range capture control. */
  initialValue?: number;
}

/**
 * One of the predefined options for a [[select]] capture.
 */
export interface SelectOption {
  /** Value to return if the option is selected. */
  value: string;
  /** Description of the option for users. */
  label: string;
}

/**
 * Configuration options for a [[select]] capture.
 */
export interface CaptureSelectOptions {
  /** Description of the selection for users. */
  placeholder?: string;
  /** List of predefined options. */
  options?: SelectOption[];
  /** Default value for the select capture control. */
  initialValue?: string;
}

/**
 * Types of files to allow for a [[media]] capture. The [[CaptureMediaOptions | configuration options]] vary by media type.
 */
export type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';

/**
 * Configuration options for a [[video]] capture.
 */
export interface CaptureVideoOptions {
  /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and return an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
  hls?: boolean;
  /** Generates pose detection data. When enabled, pose data is available after upload by appending `.poses` to the returned file URL. For example, `https://objects.koji-cdn.com/project-id/my-video.mp4.poses`. */
  estimatePoses?: boolean;
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium videos). */
  hideExtensions?: boolean;
}

/**
 * Configuration options for an [[audio]] capture.
 */
export interface CaptureAudioOptions {
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium audios). */
  hideExtensions?: boolean;
}

/**
 * Configuration options for a [[media]] capture.
 */
export interface CaptureMediaOptions {
  /** Specifies the types of media files to allow. If empty or not specified, any type of file is allowed. */
  acceptOnly?: CaptureMediaAcceptOnly[];
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium media files). */
  hideExtensions?: boolean;
  /** Specifies the configuration options for video files. */
  videoOptions?: CaptureVideoOptions;
  /** Specifies the configuration options for image files. */
  imageOptions?: CaptureImageOptions;
}

/**
 * Captures user input on the frontend of your Koji.
 */
export class Capture extends KojiBridge {
  /**
   * Map capture data to a verbose result.
   *
   * @param data Capture data returned by the platform.
   */
  private pickVerboseResultFromMessage(data: CaptureMessage<any>): VerboseCapture {
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
  audio(options: CaptureAudioOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async audio(options: CaptureAudioOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
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
  color(options: CaptureColorOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async color(options: CaptureColorOptions = {}, verbose: boolean = false): Promise<CaptureResult> {
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
   * Prompts the user to select a value from a custom control. To build a custom control, use the [[https://developer.withkoji.com/reference/packages/customvcc/withkoji-custom-vcc-sdk | @withkoji/custom-vcc-sdk package]].
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
  custom(options: CaptureCustomOptions, verbose?: boolean): Promise<any | VerboseCapture>;
  @client
  public async custom(options: CaptureCustomOptions = {}, verbose: boolean = false): Promise<any | VerboseCapture> {
    const { name, url, ...typeOptions } = options;

    if (!name && !url) throw new Error('Please supply the custom name or url for the Custom VCC you would like to load.');

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
   * Prompts the user to upload a file of any type. Use this method to allow the user to upload raw files in their original format. For example, to capture high-resolution images for download rather than for display in a browser.
   *
   * To apply automatic transcoding and transformations for specific file types, use the associated method. See [[image]], [[video]], [[audio]], or [[media]].
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
  public async file(options: CaptureFileOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
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
  image(options: CaptureImageOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async image(options: CaptureImageOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
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
  async link(options: CaptureLinkOptions = {}, verbose?: boolean): Promise<CaptureResult> {
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
   * @return          Value of the media capture, which is either the URL to the media as a string or an object with the URL and additional metadata, or the [[VerboseCapture]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const media = await Koji.ui.capture.media();
   *
   * // Limit to image or video, hide asset packs,
   * // return an object with extended metadata, transcode videos for HLS
   * const media = await Koji.ui.capture.media({
   *    acceptOnly: [image, video],
   *    hideExtensions: true,
   *    returnType: 'extended',
   *    videoOptions: { hls: true }
   *  }, true);
   * ```
   */
  media(options: CaptureMediaOptions, verbose: true): Promise<VerboseCapture>;
  media(options?: CaptureMediaOptions, verbose?: false): Promise<string>;
  media(options: CaptureMediaOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async media(options: CaptureMediaOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
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
  range(options: CaptureRangeOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async range(options: CaptureRangeOptions = {}, verbose?: boolean): Promise<CaptureResult> {
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
  select(options: CaptureSelectOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async select(options: CaptureSelectOptions = {}, verbose?: boolean): Promise<CaptureResult> {
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
  video(options: CaptureVideoOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  public async video(options: CaptureVideoOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
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
