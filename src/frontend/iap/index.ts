import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { UserToken } from '../../types';

export interface PurchaseOptions {
  amount?: number;
  customMessage?: string;
}

export interface Purchase {
  success: boolean;
  userToken: UserToken;
  receiptId?: string;
}

export class IAP extends KojiBridge {
  @client
  async startPurchase(sku: string, purchaseOptions: PurchaseOptions = {}): Promise<Purchase> {
    const { success, userToken, receiptId } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/iap/promptPurchase',
      data: {
        sku,
        purchaseOptions,
      },
    }, 'KojiIap.PurchaseFinished');

    return {
      success,
      userToken,
      receiptId,
    };
  }
}

export const iap = new IAP();
