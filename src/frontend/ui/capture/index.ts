import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';
import { FastlyOptions } from '../../../types';

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
  resultMetadata?: ExtendedMediaResult | null;
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
  KOJI = 'koji',
  MEDIA = 'media',
  RANGE = 'range',
  SELECT = 'select',
  SOUND = 'sound',
  VIDEO = 'video',
}

/**
 * Metadata when the capture option for the return type is set to `extended`.
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
 * Configuration options for a [[custom-vcc]] capture.
 */
export interface CaptureCustomOptions {
  /** The short name for the custom vcc */
  name?: string;
  /** A url where the custom vcc is being hosted */
  url?: string;
  /** Type options specific to the custom vcc */
  typeOptions?: any;
}

/**
 * Configuration options for a [[color]] capture.
 */
export interface CaptureColorOptions {
  /** Indicates whether to support transparency (`false`, by default). */
  allowAlpha?: boolean;
  /** A default value to provide to the color capture tool */
  value?: string;
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
 * Configuration options for a [[koji]] capture.
 */
export interface CaptureKojiOptions {}

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
  /** A default value to provide to the range capture tool */
  value?: number;
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
  /** A default value to provide to the range capture tool */
  value?: string;
}

/**
 * Types of files to allow for a [[media]] capture. The [[CaptureMediaOptions | configuration options]] vary by media file type.
 */
export type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';

export interface CaptureVideoOptions {
  /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and return an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
  hls?: boolean;
  /** Generates pose detection data. When enabled, pose data is available after upload by appending `.poses` to the returned file URL. For example, `https://objects.koji-cdn.com/project-id/my-video.mp4.poses`. */
  estimatePoses?: boolean;
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium videos). */
  hideExtensions?: boolean;
}

export interface CaptureSoundOptions {
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium sounds). */
  hideExtensions?: boolean;
}

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
  pickVerboseResultFromMessage(data: CaptureMessage<any>): VerboseCapture {
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

  pickResultFromMessage(data: CaptureMessage<any>): CaptureResult {
    if (data.status !== CaptureStatus.SUCCEEDED) {
      return null;
    }

    return data.result;
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
   * const color = await Koji.ui.capture.color({ allowAlpha: true, verbose: true });
   * ```
   */
  color(options: CaptureColorOptions, verbose: true): Promise<VerboseCapture>;
  color(options?: CaptureColorOptions, verbose?: false): Promise<string | null>;
  color(options: CaptureColorOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async color(options: CaptureColorOptions = {}, verbose: boolean = false): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'color',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select a value from a Custom VCC.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the value captured by the Custom VCC.
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
  async custom(options: CaptureCustomOptions = {}, verbose: boolean = false): Promise<any | VerboseCapture> {
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
   * To apply automatic transcoding and transformations for specific file types, use the associated method. See [[image]], [[video]], [[sound]], or [[media]].
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
   * const file = await Koji.ui.capture.file({ verbose: true });
   * ```
   */
  file(options: CaptureFileOptions, verbose: true): Promise<VerboseCapture>;
  file(options?: CaptureFileOptions, verbose?: false): Promise<string>;
  file(options: CaptureFileOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async file(options: CaptureFileOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'file',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

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
   * const image = await Koji.ui.capture.image({ hideExtensions: true, verbose: true });
   * ```
   */
  image(options: CaptureImageOptions, verbose: true): Promise<VerboseCapture>;
  image(options?: CaptureImageOptions, verbose?: false): Promise<string>;
  image(options: CaptureImageOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async image(options: CaptureImageOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'image',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to create a new Koji or select an existing Koji, either from the user’s profile or from a URL.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the Koji as a string.
   *
   * @return          URL to the Koji as a string or the [[VerboseCapture]] object, if `verbose` is `true`.
   * @example
   * ```javascript
   * const koji = await Koji.ui.capture.koji();
   *
   * // Return an object
   * const koji = await Koji.ui.capture.koji({ verbose: true });
   * ```
   */
  koji(options: CaptureKojiOptions, verbose: true): Promise<VerboseCapture>;
  koji(options?: CaptureKojiOptions, verbose?: false): Promise<string>;
  koji(options: CaptureKojiOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async koji(options: CaptureKojiOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'koji',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }

  /**
   * Prompts the user to select an image, file, sound, or video by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method to allow the user to select from more than one type of media with a single control. For example, allow the user to select an image or a video. You can limit the types of media to allow and configure options for each allowed type.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns only the value of the media capture, which is either the URL to the media as a string or an object with the URL and additional metadata.
   * @return          [description]
   *
   * @example
   * ```javascript
   * const media = await Koji.ui.capture.media();
   *
   * // Limit to image or video, hide asset packs, return an object with extended metadata, transcode videos for HLS
   * const media = await Koji.ui.capture.media({ acceptOnly: [image,video], hideExtensions: true, returnType: 'extended', videoOptions: { hls: true }, verbose: true });
   * ```
   */
  media(options: CaptureMediaOptions, verbose: true): Promise<VerboseCapture>;
  media(options?: CaptureMediaOptions, verbose?: false): Promise<string>;
  media(options: CaptureMediaOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async media(options: CaptureMediaOptions = {}, verbose?: boolean): Promise<CaptureResult> {
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
   * Prompts the user to select a numeric value within a certain range. You can configure the minimum value, maximum value, and default increment.
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
   * const size = await Koji.ui.capture.range({ min: 0, max: 60, step: 3, verbose: true });
   * ```
   */
  range(options: CaptureRangeOptions, verbose: true): Promise<VerboseCapture>;
  range(options?: CaptureRangeOptions, verbose?: false): Promise<number>;
  range(options: CaptureRangeOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async range(options: CaptureRangeOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<number> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'range',
          options,
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
  async select(options: CaptureSelectOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'select',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
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
   * const sound = await Koji.ui.capture.sound();
   *
   * // Hide asset packs and return an object
   * const sound = await Koji.ui.capture.sound({ hideExtensions: true, verbose: true });
   * ```
   */
  sound(options: CaptureSoundOptions, verbose: true): Promise<VerboseCapture>;
  sound(options?: CaptureSoundOptions, verbose?: false): Promise<string>;
  sound(options: CaptureSoundOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async sound(options: CaptureSoundOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'sound',
          options,
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
   * const video = await Koji.ui.capture.video({ hls: true, verbose: true });
   * ```
   */
  video(options: CaptureVideoOptions, verbose: true): Promise<VerboseCapture>;
  video(options?: CaptureVideoOptions, verbose?: false): Promise<string>;
  video(options: CaptureVideoOptions, verbose?: boolean): Promise<CaptureResult>;
  @client
  async video(options: CaptureVideoOptions = {}, verbose?: boolean): Promise<CaptureResult> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'video',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return this.pickResultFromMessage(data);
  }
}

export const capture = new Capture();
