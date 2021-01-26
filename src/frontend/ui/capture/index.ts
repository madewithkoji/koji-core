import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

export interface CaptureOptions {}

export interface CaptureColorOptions extends CaptureOptions {
  allowAlpha?: boolean;
}

export interface CaptureImageOptions extends CaptureOptions {
  hideExtensions?: boolean;
}

export type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';

export type CaptureMediaReturnType = 'url' | 'extended';

export interface CaptureMediaVideoOptions {
  hls?: boolean;
  estimatePoses: boolean;
}

export interface CaptureMediaImageOptions {
  width?: number;
}

export interface CaptureMediaOptions extends CaptureOptions {
  acceptOnly?: CaptureMediaAcceptOnly[];
  returnType?: CaptureMediaReturnType;
  hideExtensions?: boolean;
  videoOptions?: CaptureMediaVideoOptions;
  imageOptions?: CaptureMediaImageOptions;
}

export interface CaptureValue {
  event: string;
  result: string;
  status: string;
  type: string;
}

export interface MediaCaptureValue {
  event: string;
  result: ExtendedCaptureMediaValue;
  status: string;
  type: string;
}

export interface ExtendedCaptureMediaVideoMetadata {
  thumbnailUrl: string;
}

export interface ExtendedCaptureMediaAudioMetadata {
  durationSeconds: number;
}

export interface ExtendedCaptureMediaImageMetadata {
  naturalWidth: number;
  naturalHeight: number;
}

export interface ExtendedCaptureMediaValue {
  url: string;
  type: string;
  sizeBytes: string;
  videoMetadata: ExtendedCaptureMediaVideoMetadata;
  audioMetadata: ExtendedCaptureMediaAudioMetadata;
  imageMetadata: ExtendedCaptureMediaImageMetadata;
}

export interface CaptureRangeOptions extends CaptureOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface CaptureSelectOptionsOption {
  value: string;
  label?: string;
}

export interface CaptureSelectOptions extends CaptureOptions {
  placeholder?: string;
  options?: CaptureSelectOptionsOption[];
}

export interface CaptureSoundOptions extends CaptureOptions {
  hideExtensions?: boolean;
}

export interface CaptureVideoOptions extends CaptureOptions {
  hls?: boolean;
  estimatePoses?: boolean;
}

export class Capture extends KojiBridge {
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
