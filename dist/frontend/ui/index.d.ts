import { KojiBridge } from '../kojiBridge';
import { Capture } from './capture';
import { Navigate } from './navigate';
import { Present } from './present';
export declare class UI extends KojiBridge {
    capture: Capture;
    navigate: Navigate;
    present: Present;
}
export declare const ui: UI;
