import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';
import { FastlyOptions } from '../../../types';

export interface VerboseCapture {
  captureStatus: CaptureStatus;
  captureType: CaptureType;
  result?: string | number;
  resultMetadata?: ExtendedMediaResult;
}

export interface CaptureMessage<T> {
  _idempotencyKey: string;
  event: string;
  result: T;
  status: CaptureStatus;
  type: CaptureType;
}

export enum CaptureStatus {
  SUCCEEDED = 'succeeded',
  CANCELLED = 'cancelled',
}

export enum CaptureType {
  COLOR = 'color',
  FILE = 'file',
  IMAGE = 'image',
  KOJI = 'koji',
  MEDIA = 'media',
  RANGE = 'range',
  SELECT = 'select',
  SOUND = 'sound',
  VIDEO = 'video',
}

export interface ExtendedMediaResult {
  url?: string;
  sizeBytes?: string;
  videoMetadata?: {
    thumbnailUrl: string;
  };
  audioMetadata?: {
    durationSeconds: number;
  };
  imageMetadata?: {
    naturalWidth: number;
    naturalHeight: number;
  };
}

export interface CaptureColorOptions {
  allowAlpha?: boolean;
}

export interface CaptureImageOptions extends FastlyOptions {
  hideExtensions?: boolean;
}

export interface CaptureFileOptions {}

export interface CaptureKojiOptions {}

export interface CaptureRangeOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CaptureSelectOptions {
  placeholder?: string;
  options?: SelectOption[];
}

export enum CaptureMediaAcceptOnly {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
}

export interface CaptureVideoOptions {
  hls?: boolean;
  estimatePoses?: boolean;
  hideExtensions?: boolean;
}

export interface CaptureSoundOptions {
  hideExtensions?: boolean;
}

export interface CaptureMediaOptions {
  acceptOnly?: CaptureMediaAcceptOnly[];
  hideExtensions?: boolean;
  videoOptions?: CaptureVideoOptions;
  imageOptions?: CaptureImageOptions;
}

export class Capture extends KojiBridge {
  pickVerboseResultFromMessage(data: CaptureMessage<any>): VerboseCapture {
    if (data.result && typeof data.result === 'object') {
      const { url, ...resultMetadata } = data.result;

      return {
        captureStatus: data.status,
        captureType: data.type,
        result: url,
        resultMetadata,
      };
    }

    return {
      captureStatus: data.status,
      captureType: data.type,
      result: data.result,
    };
  }

  color(options: CaptureColorOptions, verbose: true): Promise<VerboseCapture>;
  color(options?: CaptureColorOptions, verbose?: false): Promise<string>;
  color(options: CaptureColorOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async color(options: CaptureColorOptions = {}, verbose: boolean = false): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'color',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  file(options: CaptureFileOptions, verbose: true): Promise<VerboseCapture>;
  file(options?: CaptureFileOptions, verbose?: false): Promise<string>;
  file(options: CaptureFileOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async file(options: CaptureFileOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'file',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  image(options: CaptureImageOptions, verbose: true): Promise<VerboseCapture>;
  image(options?: CaptureImageOptions, verbose?: false): Promise<string>;
  image(options: CaptureImageOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async image(options: CaptureImageOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'image',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  koji(options: CaptureKojiOptions, verbose: true): Promise<VerboseCapture>;
  koji(options?: CaptureKojiOptions, verbose?: false): Promise<string>;
  koji(options: CaptureKojiOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async koji(options: CaptureKojiOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'koji',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  media(options: CaptureMediaOptions, verbose: true): Promise<VerboseCapture>;
  media(options?: CaptureMediaOptions, verbose?: false): Promise<string>;
  media(options: CaptureMediaOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async media(options: CaptureMediaOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    if (verbose) {
      const data: CaptureMessage<ExtendedMediaResult> = await this.sendMessageAndAwaitResponse(
        {
          kojiEventName: 'Koji.Capture',
          data: {
            type: 'media',
            options: {
              ...options,
              returnType: 'extended',
            },
          },
        },
        'Koji.CaptureSuccess',
      );

      return this.pickVerboseResultFromMessage(data);
    }

    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'media',
          options: {
            ...options,
            returnType: 'url',
          },
        },
      },
      'Koji.CaptureSuccess',
    );

    return data.result;
  }

  range(options: CaptureRangeOptions, verbose: true): Promise<VerboseCapture>;
  range(options?: CaptureRangeOptions, verbose?: false): Promise<number>;
  range(options: CaptureRangeOptions, verbose?: boolean): Promise<number | VerboseCapture>;
  @client
  async range(options: CaptureRangeOptions = {}, verbose?: boolean): Promise<number | VerboseCapture> {
    const data: CaptureMessage<number> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'range',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  select(options: CaptureSelectOptions, verbose: true): Promise<VerboseCapture>;
  select(options?: CaptureSelectOptions, verbose?: false): Promise<string>;
  select(options: CaptureSelectOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async select(options: CaptureSelectOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'select',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  sound(options: CaptureSoundOptions, verbose: true): Promise<VerboseCapture>;
  sound(options?: CaptureSoundOptions, verbose?: false): Promise<string>;
  sound(options: CaptureSoundOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async sound(options: CaptureSoundOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'sound',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }

  video(options: CaptureSoundOptions, verbose: true): Promise<VerboseCapture>;
  video(options?: CaptureSoundOptions, verbose?: false): Promise<string>;
  video(options: CaptureSoundOptions, verbose?: boolean): Promise<string | VerboseCapture>;
  @client
  async video(options: CaptureVideoOptions = {}, verbose?: boolean): Promise<string | VerboseCapture> {
    const data: CaptureMessage<string> = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'video',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (verbose) return this.pickVerboseResultFromMessage(data);

    return data.result;
  }
}

export const capture = new Capture();
