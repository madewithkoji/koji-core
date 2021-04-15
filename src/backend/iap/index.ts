import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';
import { IAPToken } from '../../types';

/**
 * API routes for iap methods.
 */
export enum IapRoutes {
  GET_PRODUCT_BY_SKU = '/v1/iap/consumer/getProductBySku',
  RESOLVE_RECEIPTS = '/v1/iap/consumer/resolveReceipts',
  RESOLVE_RECEIPT_BY_ID = '/v1/iap/consumer/resolveReceiptById',
  RESOLVE_RECEIPTS_BY_SKU = '/v1/iap/consumer/resolveReceiptsBySku',
  UPDATE_RECEIPT = '/v1/iap/consumer/updateReceiptAttributes',
  CAPTURE_TRANSACTION = '/v1/iap/consumer/captureTransaction',
}

/**
 * Defines an interface for a receipt.
 */
export interface IapReceipt {
  receiptId: string;
  productId: string;
  purchasedPrice: number;
  attributes: { [index: string]: any };
  transactionIds: {
    credit: string;
    debit: string;
  };
  datePurchased: Date;
}

/**
 * Implements in-app purchases for the backend of your Koji.
 */
export class IAP extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
   * @param   config
   *
   * @example
   * ```javascript
   * const iap = new KojiBackend.IAP({ res });
   * ```
   */
  public constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

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
  @server
  public async resolveReceiptsByIAPToken(iapToken: IAPToken): Promise<IapReceipt[]> {
    const { data: { receipts = [] } } = await axios.post(
      `${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS}`,
      {},
      {
        headers: {
          ...this.rootHeaders,
          'X-Koji-Iap-Callback-Token': iapToken,
        },
      },
    );

    return receipts;
  }

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
  @server
  public async resolveReceiptById(receiptId: string): Promise<IapReceipt> {
    const { data: { receipt } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPT_BY_ID}`, { receiptId }, { headers: this.rootHeaders });

    return receipt;
  }

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
  @server
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[]> {
    const { data: { receipts } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS_BY_SKU}`, { sku }, { headers: this.rootHeaders });

    return receipts;
  }

  /**
   * Update receipt
   *
   * @param     receiptId     Receipt id.
   * @param     attributes    Object of key-value paired attributes to store with the receipt.
   * @param     notificationMessage    Optional notification message.
   * @return                  Data object.
   *
   * @example
   * ```javascript
   * iap.updateReceipt(id, { consumed: true }, 'You have successfully redeemed your purchase.');
   * ```
   */
  public async updateReceipt(receiptId: string, attributes: { [index: string]: any }, notificationMessage?: string): Promise<any> {
    const { data } = await axios.post(
      `${this.rootPath}${IapRoutes.UPDATE_RECEIPT}`,
      {
        receiptId,
        attributes,
        notificationMessage,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Asychronously capture a transaction.
   *
   * If your IAP product is defined in koji.json with the optional
   * `captureOnPurchase` key set to `false`, the transaction will be held in a
   * pending stage until you manually invoke `captureTransaction`. If you do not
   * invoke `captureTransaction` before the `captureExpiryPeriod` (which can
   * also be defined in your product's definition in koji.json -- from 0 to 7
   * days, with a default of 0), the transaction will automatically be reversed
   * and the buyer will be refunded. The funds will not be available in the
   * seller's account until the transaction is captured.
   *
   * @param receiptId Receipt ID
   *
   * @example
   * koji.json:
   * ```json
   * "InAppPurchases": {
   *   "enabled": true,
   *   "products": [
   *     {
   *       "sku": "video_request",
   *       "name": "Video Request",
   *       "isConsumable": true,
   *       "captureOnPurchase": false,
   *       "price": "{{remixData.price}}"
   *     }
   *   ]
   * }
   *
   * Frontend creates transaction normally.
   *
   * Backend:
   * iap.captureTransaction(receiptId);
   * ```
   */
  public async captureTransaction(receiptId: string): Promise<void> {
    await axios.post(
      `${this.rootPath}${IapRoutes.CAPTURE_TRANSACTION}`,
      {
        receiptId,
      },
      { headers: this.rootHeaders },
    );
  }

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
  public async loadProduct(sku: string) {
    const { data: { product } } = await axios.get(`${this.rootPath}${IapRoutes.GET_PRODUCT_BY_SKU}?sku=${sku}`, { headers: this.rootHeaders });

    return product;
  }
}

export interface IIAP extends IAP {}
