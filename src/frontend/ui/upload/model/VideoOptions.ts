/** Specifies the cropping constraints when remuxing a video. If not specified, the video will not be cropped. */
export interface RemuxPreset {
  /** Desired aspect ratio. */
  aspectRatio: '16:9' | '9:16' | '4:5' | '1:1' | 'passthrough';
  /** How the image will be constrained within the provided size. */
  sizePolicy: 'fill' | 'fit';
}

/** Applies a watermark to the uploaded image. Available only with HLS transcoding. */
export interface Watermark {
  /** Type of the watermark. `creatorProfileUrl` watermarks the image with `koji.to/@creatorUsername`. */
  type: 'creatorProfileUrl';
}

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
