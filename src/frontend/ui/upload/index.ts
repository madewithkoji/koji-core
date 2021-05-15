import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';
import { UploadOptions } from './model/UploadOptions';

/**
 * Uploads files from the frontend of your Koji directly to your project's CDN.
 */
export class Upload extends KojiBridge {
  /**
   * Uploads a file to your project’s CDN.
   * Use this method to provide a custom upload experience or to upload media created or captured during the template experience.
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
   *  });
   * ```
   */
  @client
  public async uploadFile(options: UploadOptions): Promise<string | null> {
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
