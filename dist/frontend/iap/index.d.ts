import { KojiBridge } from '../kojiBridge';
export interface PurchaseOptions {
    amount?: number;
    customMessage?: string;
}
export interface Purchase {
    success: boolean;
    userToken: UserToken;
    receiptId?: string;
}
export declare class IAP extends KojiBridge {
    purchaseCallback?: Function;
    register(): void;
    startPurchase(sku: string, purchaseOptions?: PurchaseOptions): Promise<Purchase>;
}
export declare const iap: IAP;
