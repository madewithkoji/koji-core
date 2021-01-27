import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Configuration options for the capture. The available options vary by type.
 */
export interface CaptureOptions {}

/**
 * Configuration options for a [[color]] capture.
 */
export interface CaptureColorOptions extends CaptureOptions {
  /** Indicates whether to support transparency (`false`, by default). */
  allowAlpha?: boolean;
}

/**
 * Configuration options for an [[image]] capture.
 */
export interface CaptureImageOptions extends CaptureOptions {
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium images). */
  hideExtensions?: boolean;
}

/**
 * Types of files to allow for a [[media]] capture. The [[CaptureMediaOptions | configuration options]] vary by media file type.
 */
export type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';

/**
 * Type of value to return for a [[media]] capture. Either the URL to the media as a string or an object with the URL and additional metadata.
 */
export type CaptureMediaReturnType = 'url' | 'extended';

/**
 * Configuration options for a [[media]] capture of a video file.
 */
export interface CaptureMediaVideoOptions {
  /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and return an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
  hls?: boolean;
  /** Generates pose detection data. When enabled, pose data is available after upload by appending `.poses` to the returned file URL. For example, `https://objects.koji-cdn.com/project-id/my-video.mp4.poses`. */
  estimatePoses: boolean;
}

/**
 * Configuration options for an [[media]] capture of an image file.
 */
export interface CaptureMediaImageOptions {
  /** Resizes the image to the specified width. */
  width?: number;
}

/**
 * Configuration options for a [[media]] capture.
 */
export interface CaptureMediaOptions extends CaptureOptions {
  /** Specifies the types of media files to allow. If empty or not specified, any type of file is allowed. */
  acceptOnly?: CaptureMediaAcceptOnly[];
  /** Specifies the type of the return value for the capture. If empty or not specified, `extended` data is returned. */
  returnType?: CaptureMediaReturnType;
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, when uploading premium content). */
  hideExtensions?: boolean;
  /** Specifies the configuration options for video files. */
  videoOptions?: CaptureMediaVideoOptions;
  /** Specifies the configuration options for image files. */
  imageOptions?: CaptureMediaImageOptions;
}

/**
 * Result of a user input capture.
 */
export interface CaptureValue {
  /** Value captured from the user. */
  result: string;
  /** Whether the user completed the selection (`succeeded`) or exited the control without selecting a value (`cancelled`). */
  status: string;
  /** Capture method type (for example, `color` or `file`). */
  type: string;
}

/**
 * Result of a [[media]] file capture.
 */
export interface MediaCaptureValue {
  /** Value captured from the user. */
  result: ExtendedCaptureMediaValue;
  /** Whether the user completed the selection (`succeeded`) or exited the control without selecting a value (`cancelled`). */
  status: string;
  /** Capture method type (for example, `color` or `file`). */
  type: string;
}

/**
 * Metadata for a video file.
 */
export interface ExtendedCaptureMediaVideoMetadata {
  /** URL for the video thumbnail. */
  thumbnailUrl: string;
}

/**
 * Metadata for an audio file.
 */
export interface ExtendedCaptureMediaAudioMetadata {
  /** Duration in seconds for an audio file. */
  durationSeconds: number;
}

/**
 * Metadata for an image file.
 */
export interface ExtendedCaptureMediaImageMetadata {
  /** Natural width of the image in pixels. */
  naturalWidth: number;
  /** Natural height of the image in pixels. */
  naturalHeight: number;
}

/**
 * Metadata when the capture option for the return type is set to `extended`.
 */
export interface ExtendedCaptureMediaValue {
  /** URL of the selected media file. */
  url: string;
  /** Type of media: `image`, `video`, `audio`, or `file`. */
  type: string;
  /** Size in bytes of the media file. */
  sizeBytes: string;
  /** Metadata for a video file. */
  videoMetadata: ExtendedCaptureMediaVideoMetadata;
  /** Metadata for an audio file. */
  audioMetadata: ExtendedCaptureMediaAudioMetadata;
  /** Metadata for an image file. */
  imageMetadata: ExtendedCaptureMediaImageMetadata;
}

/**
 * Configuration options for a [[range]] capture.
 */
export interface CaptureRangeOptions extends CaptureOptions {
  /** Minimum value. Default is `0`. */
  min?: number;
  /** Maximum value. Default is `100`. */
  max?: number;
  /** Default increment/step size. Default is `1`. */
  step?: number;
}

/**
 * One of the predefined options for a [[select]] capture.
 */
export interface CaptureSelectOptionsOption {
  /** Value to return if the option is selected. */
  value: string;
  /** Description of the option for users. */
  label?: string;
}

/**
 * Configuration options for a [[select]] capture.
 */
export interface CaptureSelectOptions extends CaptureOptions {
  /** Description of the selection for users. */
  placeholder?: string;
  /** List of predefined options. */
  options?: CaptureSelectOptionsOption[];
}

/**
 * Configuration options for a [[sound]] capture.
 */
export interface CaptureSoundOptions extends CaptureOptions {
  /** Whether to hide all asset packs and VCC extensions. Enable this option in cases where they do not make sense (for example, Kojis for selling premium sounds). */
  hideExtensions?: boolean;
}

/**
 * Configuration options for a [[video]] capture.
 */
export interface CaptureVideoOptions extends CaptureOptions {
  /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and return an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
  hls?: boolean;
  /** Generates pose detection data. When enabled, pose data is available after upload by appending `.poses` to the returned file URL. For example, `https://objects.koji-cdn.com/project-id/my-video.mp4.poses`. */
  estimatePoses?: boolean;
}

/**
 * Captures user input on the frontend of your Koji.
 */
export class Capture extends KojiBridge {
  /**
   * Prompts the user to select a color, either from a swatch or by entering a color code. Supports HEX, RGB, or HSL by default. Supports RBGA or HSLA, if transparency is enabled in the capture options.
  *
  * @param   options
  * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the color code as a string.
  * @return          [description]
  *
  * @example
  * ```javascript
  * const color = await Koji.ui.capture.color();
  *
  * // Enable transparency and return an object
  * const color = await Koji.ui.capture.color({ allowAlpha: true, verbose: true });
  * ```
  */
  color(options: CaptureColorOptions, verbose: true): Promise<CaptureValue>;
  color(options: CaptureColorOptions, verbose: false): Promise<string>;
  color(options?: CaptureColorOptions): Promise<string>;
  color(options: CaptureColorOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async color(options: CaptureColorOptions = {}, verbose: boolean = false): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to upload a file of any type. Use this method to allow the user to upload raw files in their original format. For example, to capture high-resolution images for download rather than for display in a browser.
   *
   * To apply automatic transcoding and transformations for specific file types, use the associated method. See [[image]], [[video]], [[sound]], or [[media]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the file as a string.
   * @return          [description]
   *
   * @example
   * ```javascript
   * const file = await Koji.ui.capture.file();
   *
   * // Return an object
   * const file = await Koji.ui.capture.file({ verbose: true });
   * ```
   */
  file(options: CaptureOptions, verbose: true): Promise<CaptureValue>;
  file(options: CaptureOptions, verbose: false): Promise<string>;
  file(options?: CaptureOptions): Promise<string>;
  file(options: CaptureOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async file(options: CaptureOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to select an image by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting an image.
   *
   * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the image asset as a string.
   * @return          [description]
   *
   * @example
   * ```javascript
   * const image = await Koji.ui.capture.image();
   *
   * // Hide asset packs and return an object
   * const image = await Koji.ui.capture.image({ hideExtensions: true, verbose: true });
   * ```
   */
  image(options: CaptureImageOptions, verbose: true): Promise<CaptureValue>;
  image(options: CaptureImageOptions, verbose: false): Promise<string>;
  image(options?: CaptureImageOptions): Promise<string>;
  image(options: CaptureImageOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async image(options: CaptureImageOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to create a new Koji or select an existing Koji, either from the user’s profile or from a URL.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the Koji as a string.
   *
   * @return          [description]
   * @example
   * ```javascript
   * const koji = await Koji.ui.capture.koji();
   *
   * // Return an object
   * const koji = await Koji.ui.capture.koji({ verbose: true });
   * ```
   */
  koji(options: CaptureOptions, verbose: true): Promise<CaptureValue>;
  koji(options: CaptureOptions, verbose: false): Promise<string>;
  koji(options?: CaptureOptions): Promise<string>;
  koji(options: CaptureOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async koji(options: CaptureOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
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
  media(options: { returnType: 'url' }, verbose: true): Promise<CaptureValue>;
  media(options: { returnType: 'url' }, verbose: false): Promise<string>;
  media(options: { returnType: 'extended' }, verbose: true): Promise<MediaCaptureValue>;
  media(options: { returnType: 'extended' }, verbose: false): Promise<ExtendedCaptureMediaValue>;
  media(options: CaptureMediaOptions, verbose: true): Promise<MediaCaptureValue>;
  media(options: CaptureMediaOptions, verbose: false): Promise<ExtendedCaptureMediaValue>;
  media(options?: CaptureMediaOptions): Promise<ExtendedCaptureMediaValue>;
  media(options: CaptureMediaOptions, verbose: boolean): Promise<string | MediaCaptureValue | CaptureValue | ExtendedCaptureMediaValue>;
  @client
  async media(options: CaptureMediaOptions = {}, verbose?: boolean): Promise<string | MediaCaptureValue | CaptureValue | ExtendedCaptureMediaValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to select a numeric value within a certain range. You can configure the minimum value, maximum value, and default increment.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the numeric value as a string.
   * @return          Numeric value as a string or the [[CaptureValue]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const size = await Koji.ui.capture.range();
   *
   * // Return an object
   * const size = await Koji.ui.capture.range({ min: 0, max: 60, step: 3, verbose: true });
   * ```
   */
  range(options: CaptureRangeOptions, verbose: true): Promise<CaptureValue>;
  range(options: CaptureRangeOptions, verbose: false): Promise<string>;
  range(options?: CaptureRangeOptions): Promise<string>;
  range(options: CaptureRangeOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async range(options: CaptureRangeOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to select from a predefined list of options.
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the option as a string.
   * @return         Value of the predefined option as a string or the [[CaptureValue]] object, if `verbose` is `true`.
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
  select(options: CaptureSelectOptions, verbose: true): Promise<CaptureValue>;
  select(options: CaptureSelectOptions, verbose: false): Promise<string>;
  select(options?: CaptureSelectOptions): Promise<string>;
  select(options: CaptureSelectOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async select(options: CaptureSelectOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   * Prompts the user to select a sound by selecting from the available asset packs, by uploading a file, or by entering a URL. Use this method when you want to limit the user to selecting a sound.
   *
   * To allow multiple types of media assets, see [[media]]. To allow upload of raw files of any type, see [[file]].
   *
   * @param   options
   * @param   verbose Indicates whether to return additional metadata about the capture event. If `false` or not specified, returns the URL to the audio asset as a string.
   * @return         URL to the audio asset as a string or the [[CaptureValue]] object, if `verbose` is `true`.
   *
   * @example
   * ```javascript
   * const sound = await Koji.ui.capture.sound();
   *
   * // Hide asset packs and return an object
   * const sound = await Koji.ui.capture.sound({ hideExtensions: true, verbose: true });
   * ```
   */
  sound(options: CaptureSoundOptions, verbose: true): Promise<CaptureValue>;
  sound(options: CaptureSoundOptions, verbose: false): Promise<string>;
  sound(options?: CaptureSoundOptions): Promise<string>;
  sound(options: CaptureSoundOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async sound(options: CaptureSoundOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }

  /**
   *
   *
   * @param   options [description]
   * @param   verbose [description]
   * @return          [description]
   *
   * @example
   * ```javascript
   * const video = await Koji.ui.capture.video();
   *
   * // Transcode for HLS and return an object
   * const video = await Koji.ui.capture.video({ hls: true, verbose: true });
   * ```
   */
  video(options: CaptureVideoOptions, verbose: true): Promise<CaptureValue>;
  video(options: CaptureVideoOptions, verbose: false): Promise<string>;
  video(options?: CaptureVideoOptions): Promise<string>;
  video(options: CaptureVideoOptions, verbose: boolean): Promise<string | CaptureValue>;
  @client
  async video(options: CaptureVideoOptions = {}, verbose?: boolean): Promise<string | CaptureValue> {
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

    if (verbose) return data;

    return data.result;
  }
}

export const capture = new Capture();
