import { KojiBridge } from '../kojiBridge';
import { capture, Capture } from './capture';
import { navigate, Navigate } from './navigate';
import { present, Present } from './present';

export class UI extends KojiBridge {
  capture: Capture = capture;
  navigate: Navigate = navigate;
  present: Present = present;
}

export const ui = new UI();
