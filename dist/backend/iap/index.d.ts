import { Response } from 'express';
export declare enum IapRoutes {
    GET_PRODUCT_BY_SKU = "/v1/iap/provider/getProductBySku",
    RESOLVE_RECEIPTS = "/v1/iap/consumer/resolveReceipts",
    RESOLVE_RECEIPT_BY_ID = "/v1/iap/consumer/resolveReceiptById",
    RESOLVE_RECEIPTS_BY_SKU = "/v1/iap/consumer/resolveReceiptsBySku",
    UPDATE_RECEIPT = "/v1/iap/consumer/updateReceiptAttributes"
}
export declare type UserToken = string;
export interface IapReceipt {
    receiptId: string;
    productId: string;
    purchasedPrice: number;
    attributes: {
        [index: string]: any;
    };
    transactionIds: {
        credit: string;
        debit: string;
    };
    datePurchased: Date;
}
export declare class IAP {
    private projectId;
    private projectToken;
    private rootPath;
    private rootHeaders;
    constructor(res: Response);
    resolveReceiptsByUserToken(userToken: UserToken): Promise<IapReceipt[]>;
    resolveReceiptById(receiptId: string): Promise<IapReceipt | null>;
    resolveReceiptsBySku(sku: string): Promise<IapReceipt[]>;
    updateReceipt(receiptId: string, attributes: {
        [index: string]: any;
    }, notificationMessage?: string): Promise<any>;
    loadProduct(sku: string): Promise<any>;
}
export interface IIAP extends IAP {
}
