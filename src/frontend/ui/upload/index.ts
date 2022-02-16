import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';
import { RemuxPreset, Watermark } from '../../../types';

/** Options for uploaded videos. */
export interface VideoOptions {
  /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and saved as an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
  hls?: boolean;
  /** Remuxes video files constructed from getUserMedia MediaStreams, which ensures these files contain correct duration headers before they are delivered. */
  remux?: boolean;
  /** Specifies the cropping constraints when remuxing a video. If not specified, the video will not be cropped. */
  remuxPreset?: RemuxPreset;
  /** Applies a watermark to the uploaded image. Available only with HLS transcoding. */
  watermark?: Watermark;
}

/**
 * Request options for a [[uploadFile | file upload]].
 */
export interface UploadOptions {
  /** File to upload. */
  file: File;
  /** Media type of the file, which is used to determine whether transcoding or other processing is required. */
  type: 'image'|'video'|'audio';
  /** Options for uploaded videos. */
  videoOptions?: VideoOptions;
  /** Set to true to handle progress in the app instead of showing the Koji overlay */
  silent?: boolean;
}

/**
 * Uploads files from the frontend of your Koji app directly to your project's CDN.
 */
export class Upload extends KojiBridge {
  /**
   * Uploads a file to your project’s CDN.
   * Use this method to provide a custom upload experience or to upload media created or captured during the app experience.
   * For example, recording a video or drawing on a canvas.
   *
   * To upload files with the standard platform control, use {@doclink core-frontend-ui-capture#file | Capture.file }.
   *
   * NOTE: To use this method for uploading a file collected by a file input, you must extract the blob and reconstruct the file.
   * Browser sandboxing will not allow the native file to be transferred.
   *
   * @param   options     Request options for the file upload.
   *
   * @return              Unique URL for accessing the file on `images.koji-cdn.com` or `objects.koji-cdn.com`, depending on the type of file.
   *
   * @example
   * ```javascript
   * const url = await Koji.ui.upload.uploadFile({
   *  file: new File([blob], 'video.webm'),
   *  type: 'video',
   *  videoOptions: {
   *    hls: true,
   *  }
   * });
   * ```
   */
  @client
  public async uploadFile(options: UploadOptions): Promise<string|null> {
    const data = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Upload',
        data: {
          file: options.file,
          type: options.type,
          videoOptions: options.videoOptions,
          silent: options.silent,
        },
      },
      'Koji.UploadComplete',
    );

    return data.result;
  }
}

export const upload = new Upload();
