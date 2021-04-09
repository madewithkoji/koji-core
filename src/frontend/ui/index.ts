import { KojiBridge } from '../kojiBridge';
import { capture, Capture } from './capture';
import { navigate, Navigate } from './navigate';
import { present, Present } from './present';
import { upload, Upload } from './upload';

export class UI extends KojiBridge {
  capture: Capture = capture;
  navigate: Navigate = navigate;
  present: Present = present;
  upload: Upload = upload;
}

export const ui = new UI();
