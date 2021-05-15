import { VideoOptions } from './VideoOptions';

/**
 * Request options for a [[uploadFile | file upload]].
 */

export interface UploadOptions {
  /** File to upload. */
  file: File;
  /** Media type of the file, which is used to determine whether transcoding or other processing is required. */
  type: 'image' | 'video' | 'audio';
  /** Options for uploaded videos. */
  videoOptions?: VideoOptions;
}
