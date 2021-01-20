import { KojiBridge } from '../bridge';
import { capture, Capture } from './capture';

export class UI extends KojiBridge {
  capture: Capture = capture;
}

export const ui = new UI();
