import { Base, BackendConfigurationInput } from '../base';
import { IAPToken } from '../../types';
/**
 * API routes for iap methods.
 */
export declare enum IapRoutes {
    GET_PRODUCT_BY_SKU = "/v1/iap/provider/getProductBySku",
    RESOLVE_RECEIPTS = "/v1/iap/consumer/resolveReceipts",
    RESOLVE_RECEIPT_BY_ID = "/v1/iap/consumer/resolveReceiptById",
    RESOLVE_RECEIPTS_BY_SKU = "/v1/iap/consumer/resolveReceiptsBySku",
    UPDATE_RECEIPT = "/v1/iap/consumer/updateReceiptAttributes"
}
/**
 * Defines an interface for a receipt.
 */
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
/**
 * Implements in-app purchases for the backend of your Koji. For more information, see
 * [[https://developer.withkoji.com/reference/packages/withkoji-koji-iap-package | the in-app purchases package reference]].
 */
export declare class IAP extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * @param   config
     *
     * @example
     * ```javascript
     * const iap = new KojiBackend.IAP({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Get receipts by user token
     *
     * @param     authToken     User token.
     * @return                  Array of receipts.
     *
     * @example
     * ```javascript
     * const receipts = iap.resolveReceiptsByUserToken(token);
     * ```
     */
    resolveReceiptsByIAPToken(iapToken: IAPToken): Promise<IapReceipt[]>;
    /**
     * Get receipts by receipt id
     *
     * @param     receiptId     Receipt id.
     * @return                  Array of receipts.
     *
     * @example
     * ```javascript
     * const receipt = iap.resolveReceiptById(id);
     * ```
     */
    resolveReceiptById(receiptId: string): Promise<IapReceipt>;
    /**
     * Get receipts for a product by sku
     *
     * @param     sku     Product sku.
     * @return            Array of receipts that include the product.
     *
     * @example
     * ```javascript
     * const receipts = iap.resolveReceiptById(sku);
     * ```
     */
    resolveReceiptsBySku(sku: string): Promise<IapReceipt[]>;
    /**
     * Update receipt
     *
     * @param     receiptId     Receipt id.
     * @param     attributes    Array of receipt attributes.
     * @param     notificationMessage    Optional notification message.
     * @return                  Data object.
     *
     * @example
     * ```javascript
     * iap.updateReceipt(id, ['paid']);
     * ```
     */
    updateReceipt(receiptId: string, attributes: {
        [index: string]: any;
    }, notificationMessage?: string): Promise<any>;
    /**
     * Load product by sku.
     *
     * @param     sku     Product sku.
     * @return            Data object.
     *
     * @example
     * ```javascript
     * iap.loadProduct(sku);
     * ```
     */
    loadProduct(sku: string): Promise<any>;
}
export interface IIAP extends IAP {
}
