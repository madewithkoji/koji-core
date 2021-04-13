import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Request options for a [[uploadFile | file upload]].
 */
export interface UploadOptions {
  /** File to upload. */
  file: File;
  /** Media type of the file, which is used to determine whether transcoding or other processing is required. */
  type: 'image'|'video'|'audio';
  /** Options for uploaded video. */
  videoOptions?: {
    /** Enables HTTP Live Streaming (HLS) for delivery of longer content. When enabled, uploaded videos are transcoded for HLS and saved as an m3u8 playlist. Use this feature in conjunction with [[https://github.com/video-dev/hls.js/ | hls.js]] for controlling playback. */
    hls: boolean;
    /** Video files constructed from getUserMedia MediaStreams will not contain correct duration headers, and need to be remuxed by Koji before they are delivered. */
    remux: boolean;
  };
}

/**
 * Uploads files from the frontend of your Koji directly to your project's CDN.
 */
export class Upload extends KojiBridge {
  /**
   * Uploads a file to your project’s CDN. You can use this method to upload media created or captured by the user as part of the template experience. For example, recording a video or drawing on a canvas.
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
