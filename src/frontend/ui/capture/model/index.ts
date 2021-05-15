import { FastlyOptions } from './FastlyOptions';
import { RemuxPreset, Watermark } from '../../upload/model/VideoOptions';

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
  result?: string | number | null;
  /** Metadata associated with the captured result. */
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
/** Metadata for a video file. */

export interface VideoMetadata {
  /** URL for the video thumbnail. */
  thumbnailUrl: string;
}
/** Metadata for an audio file. */

export interface AudioMetadata {
  /** Duration in seconds for an audio file. */
  durationSeconds: number;
}
/** Metadata for an image file. */

export interface ImageMetadata {
  /** Natural width of the image in pixels. */
  naturalWidth: number;
  /** Natural height of the image in pixels. */
  naturalHeight: number;
}
/**
 * Extended metadata for a [[media]] capture.
 */

export interface ExtendedMediaResult {
  /** URL of the selected media file. */
  url?: string;
  /** Type of media: `image`, `video`, `audio`, or `file`. */
  type?: string;
  /** Size in bytes of the media file. */
  sizeBytes?: string;
  /** Metadata for a video file. */
  videoMetadata?: VideoMetadata;
  /** Metadata for an audio file. */
  audioMetadata?: AudioMetadata;
  /** Metadata for an image file. */
  imageMetadata?: ImageMetadata;
}
/**
 * Extended metadata for a [[link]] capture.
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
  /** Template store ID of a Koji template. Include this value to enable the user to create a new Koji from the link control. */
  kojiTemplateId?: string;
  /** Whether to prevent users from pasting an external link. If `true`, users can select only one of their Kojis. */
  disableExternalLinks?: boolean;
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
  /** Remuxes video files constructed from getUserMedia MediaStreams, which ensures these files contain correct duration headers before they are delivered. */
  remux?: boolean;
  /** Specifies the cropping constraints when remuxing a video. If not specified, the video will not be cropped. */
  remuxPreset?: RemuxPreset;
  /** Applies a watermark to the uploaded image. Available only with HLS transcoding. */
  watermark?: Watermark;
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
