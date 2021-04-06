import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';
import { IAPToken } from '../../types';

/**
 * API routes for iap methods.
 */
export enum IapRoutes {
  GET_PRODUCT_BY_SKU = '/v1/iap/provider/getProductBySku',
  RESOLVE_RECEIPTS = '/v1/iap/consumer/resolveReceipts',
  RESOLVE_RECEIPT_BY_ID = '/v1/iap/consumer/resolveReceiptById',
  RESOLVE_RECEIPTS_BY_SKU = '/v1/iap/consumer/resolveReceiptsBySku',
  UPDATE_RECEIPT = '/v1/iap/consumer/updateReceiptAttributes',
}

/**
 * Receipt for a user’s purchase of a product.
 * Resolve receipts with [[resolveReceiptById]], [[resolveReceiptsByIAPToken]], or [[resolveReceiptsBySku]].
 * Add custom attributes for to a receipt with [[updateReceipt]].
 */
export interface IapReceipt {
  /** Unique identifier for the receipt. */
  receiptId: string;
  /** Unique identifier for the product. */
  productId: string;
  /** Price the user paid for the product. */
  purchasedPrice: number;
  /** Object containing a list of custom key-value pairs associated with the receipt.
  * You can use [[updateReceipt]] to update these values.
  * Additionally, the fulfillment information (email, phone, or address) and customMessage are included this object, if set at purchase time.
  */
  attributes: { [index: string]: any };
  /**
   * Object containing references to the associated transaction receipts – `credit` for the user receiving the funds (seller), `debit` for the user sending the funds (buyer).
   * To link to the transaction receipt in the user’s Koji wallet, use the format `https://withkoji.com/payments/transactions/TXN_ID`.
   */
  transactionIds: {
    credit: string;
    debit: string;
  };
  /** Date of the purchase */
  datePurchased: Date;
}

/**
 * Manages in-app purchases on the backend of your Koji template.
 */
export class IAP extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
   * Instantiates the IAP class.
   *
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
   * Gets all receipts for the current user, which can be used to validate purchases for specific products.
   *
   * @param     iapToken     Short-lived IAP token for the current user.
   *
   * @return                 Array of receipts for the user's purchases.
   *
   * @example
   * ```javascript
   * const receipts = await iap.resolveReceiptsByIAPToken(iapToken);
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
   * Gets a specific transaction receipt by its ID, which can be used to facilitate fulfillment.
   * For example, use a dynamic receipt to upload a video response from the seller and then share that response with the buyer.
   *
   * @param     receiptId     Unique identifier for the receipt.
   * @return                  Object for the specified receipt.
   *
   * @example
   * ```javascript
   * const receipt = await iap.resolveReceiptById(id);
   *
   * // Use custom attributes for a video response
   * this.setState({
   *  instructions: receipt.attributes.message,
   *  video: receipt.attributes.video,
   * });
   * ```
   */
  @server
  public async resolveReceiptById(receiptId: string): Promise<IapReceipt> {
    const { data: { receipt } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPT_BY_ID}`, { receiptId }, { headers: this.rootHeaders });

    return receipt;
  }

  /**
   * Gets all receipts for a specified product, which can be used to aggregate sales data.
   *
   * @param     sku     Identifier for the product. Products are defined in the entitlements file and registered or updated when the template is published.
   * @return            Array of receipts for the specified product.
   *
   * @example
   * ```javascript
   * const receipts = await iap.resolveReceiptBySku(sku);
   * ```
   */
  @server
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[]> {
    const { data: { receipts } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS_BY_SKU}`, { sku }, { headers: this.rootHeaders });

    return receipts;
  }

  /**
   * Updates the custom attributes for a specified receipt.
   * For example, if a user purchases a "power up" and then uses it in a game, you can update the receipt to indicate that the product has been consumed and is not available for future sessions.
   *
   * @param     receiptId             Unique identifier for the receipt.
   * @param     attributes            Object of key-value paired attributes to store with the receipt.
   * @param     notificationMessage   Custom message to sent the user when the receipt is updated (up to 80 characters). If undefined, the message will read: `Your receipt for PRODUCT_NAME was updated.`
   *
   * @return                          Confirmation of the update, if the request was successful, or an error message, if not.
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
   * Gets the properties of a specified product, which enables the template to leverage dynamic product information.
   * For example, you can check the stock for a product with limited quantity (via the `numAvailable` property), and indicate the number of remaining items.
   *
   * @param     sku     Identifier for the product.
   * @return            Properties of the specified product.
   *
   * @example
   * ```javascript
   * const product = await iap.loadProduct(sku);
   * ```
   */
  public async loadProduct(sku: string) {
    const { data: { product } } = await axios.get(`${this.rootPath}${IapRoutes.GET_PRODUCT_BY_SKU}?appId=${this.projectId}&sku=${sku}`, { headers: this.rootHeaders });

    return product;
  }
}

export interface IIAP extends IAP {}
