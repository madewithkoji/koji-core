import { KojiBridge } from '../kojiBridge';
import { capture, Capture } from './capture';
import { present, Present } from './present';

export class UI extends KojiBridge {
  capture: Capture = capture;
  present: Present = present;
}

export const ui = new UI();
