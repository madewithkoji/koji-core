import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Defines a request that the platform upload a file on behalf of the template
 */
export interface UploadOptions {
  /** File to upload */
  file: File;
  /** The type of file to upload (used to determine if something like transcoding is required) */
  type: 'image'|'video'|'audio';
  /** Options for uploaded video */
  videoOptions?: {
    hls: boolean;
  };
}

/**
 * Presents dialog boxes to users on the frontend of your Koji.
 */
export class Upload extends KojiBridge {
  /**
   * Use Koji to upload a file on behalf of the template. This can be useful for media created or captured by the user as part of the template experience (e.g., recording a video, or drawing on a canvas)
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
