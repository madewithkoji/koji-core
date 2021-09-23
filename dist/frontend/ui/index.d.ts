import { KojiBridge } from '../kojiBridge';
import { Capture } from './capture';
import { Navigate } from './navigate';
import { Present } from './present';
import { Upload } from './upload';
/**
 * Defines the user interface for KojiBridge.
 */
export declare class UI extends KojiBridge {
    capture: Capture;
    navigate: Navigate;
    present: Present;
    upload: Upload;
}
export declare const ui: UI;
