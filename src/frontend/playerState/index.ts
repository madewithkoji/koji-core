import qs from 'qs';
import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

export type PlayerStateContext = 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'view';

export type PlayerStateReceiptType = 'buyer' | 'seller';

export interface ExpectedQueryParameters {
  context?: PlayerStateContext;
  'dynamic-receipt'?: PlayerStateReceiptType;
}

export type EditorType = 'instant' | 'full';
export type EditorMode = 'edit' | 'new';

export interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

export type ReceiptType = 'seller' | 'buyer';

export type IsRemixingCallback = (isRemixing: boolean, editorAttributes: EditorAttributes) => Function;

export class PlayerState extends KojiBridge {
  context: PlayerStateContext;
  receiptType?: ReceiptType;

  constructor() {
    super();

    const params: ExpectedQueryParameters = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    if (window.location.href.includes('koji-screenshot')) {
      this.context = 'screenshot';
    } else {
      const { context = 'view', 'dynamic-receipt': receiptType } = params;

      this.context = context;
      this.receiptType = receiptType;
    }
  }

  @client
  subscribe(callback: IsRemixingCallback): Function {
    return this.execCallbackOnMessage(
      ({ isRemixing, editorAttributes }: { isRemixing: boolean; editorAttributes: EditorAttributes }) => {
        callback(isRemixing, editorAttributes);
      },
      'KojiPreview.IsRemixing',
    );
  }
}

export const playerState = new PlayerState();
