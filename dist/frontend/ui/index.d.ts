import { KojiBridge } from '../kojiBridge';
import { Capture } from './capture';
import { Present } from './present';
export declare class UI extends KojiBridge {
    capture: Capture;
    present: Present;
}
export declare const ui: UI;
