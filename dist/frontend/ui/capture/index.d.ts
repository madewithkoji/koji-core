import { KojiBridge } from '../../bridge';
export interface CaptureOptions {
    verbose?: boolean;
}
export interface CaptureColorOptions extends CaptureOptions {
    allowAlpha?: boolean;
}
export interface CaptureImageOptions extends CaptureOptions {
    hideExtensions?: boolean;
}
export declare type CaptureMediaAcceptOnly = 'image' | 'video' | 'audio' | 'file';
export declare type CaptureMediaReturnType = 'url' | 'extended';
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
export declare class Capture extends KojiBridge {
    color(options?: CaptureColorOptions): Promise<string | CaptureValue>;
    file(options?: CaptureOptions): Promise<string | CaptureValue>;
    image(options?: CaptureImageOptions): Promise<string | CaptureValue>;
    koji(options?: CaptureOptions): Promise<string | CaptureValue>;
    media(options?: CaptureMediaOptions): Promise<string | CaptureValue | ExtendedCaptureMediaValue>;
    range(options?: CaptureRangeOptions): Promise<string | CaptureValue>;
    select(options?: CaptureSelectOptions): Promise<string | CaptureValue>;
    sound(options?: CaptureSoundOptions): Promise<string | CaptureValue>;
    video(options?: CaptureVideoOptions): Promise<string | CaptureValue>;
}
export declare const capture: Capture;
