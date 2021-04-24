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
}

/**
 * Uploads files from the frontend of your Koji directly to your project's CDN.
 */
export class Upload extends KojiBridge {
  /**
   * Uploads a file to your project’s CDN. You can use this method to upload media created or captured by the user as part of the template experience. For example, recording a video or drawing on a canvas. Note that if you intend to use this method to upload a file collected by a file input, you must extract the blob and reconstruct the file, as browser sandboxing will not allow the native File to be transferred.
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
   *  });
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
        },
      },
      'Koji.UploadComplete',
    );

    return data.result;
  }
}

export const upload = new Upload();
