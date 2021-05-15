import axios from 'axios';
import { IAPToken } from '../../types/IAPToken';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';
import { IapReceipt, IapProduct } from './model';

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
  REFUND_TRANSACTION = '/v1/iap/consumer/refundTransaction',
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
  public async resolveReceiptsByIAPToken(
    iapToken: IAPToken,
  ): Promise<IapReceipt[]> {
    const {
      data: { receipts = [] },
    } = await axios.post(
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
   * Or, capture product options, such as color or size, to display to the seller in the admin page.
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
    const {
      data: { receipt },
    } = await axios.post(
      `${this.rootPath}${IapRoutes.RESOLVE_RECEIPT_BY_ID}`,
      { receiptId },
      { headers: this.rootHeaders },
    );

    return receipt;
  }

  /**
   * Gets all receipts for a specified product, which can be used to aggregate sales data.
   *
   * @param     sku     Identifier for the product. Products are defined in the entitlements file and registered or updated when the project is deployed.
   * @return            Array of receipts for the specified product.
   *
   * @example
   * ```javascript
   * const receipts = await iap.resolveReceiptBySku(sku);
   * ```
   */
  @server
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[]> {
    const {
      data: { receipts },
    } = await axios.post(
      `${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS_BY_SKU}`,
      { sku },
      { headers: this.rootHeaders },
    );

    return receipts;
  }

  /**
   * Updates the custom attributes for a specified receipt.
   * For example, if a user purchases a credit toward a product on the Koji and then uses it, you can update the receipt to indicate that the credit has been consumed and is not available for future sessions.
   *
   * @param     receiptId             Unique identifier for the receipt.
   * @param     attributes            Object of key-value paired attributes to store with the receipt.
   * @param     notificationMessage   Custom message to sent the user when the receipt is updated (up to 80 characters). If undefined, the message will read: `Your receipt for PRODUCT_NAME was updated.`
   *
   * @return                          Confirmation of the update, if the request was successful, or an error message, if not.
   *
   * @example
   * ```javascript
   * iap.updateReceipt(id, { consumed: true }, 'You have successfully redeemed your credit.');
   * ```
   */
  public async updateReceipt(
    receiptId: string,
    attributes: { [index: string]: any },
    notificationMessage?: string,
  ): Promise<any> {
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
   * Captures a pending transaction.
   *
   * NOTE: If your IAP product is defined with the `captureOnPurchase` key set to `false`, the transaction is held in a pending state until you manually invoke `captureTransaction`.
   * Funds are not available in the seller's account until the transaction is captured.
   * If you do not capture the transaction before the `captureExpiryPeriod`, the transaction is automatically reversed and the buyer is refunded.
   * This period can be specified in the product definition from 0 to 7 days (default is 0).
   *
   * @param receiptId Unique identifier for the transaction receipt.
   *
   * @example
   *
   * ```javascript
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
   * Refunds a transaction.
   *
   * NOTE: Only unsettled transactions can be refunded.
   *
   * @param receiptId Unique identifier for the transaction receipt.
   *
   * @example
   * ```javascript
   * iap.refundTransaction(receiptId);
   * ```
   */
  public async refundTransaction(receiptId: string): Promise<void> {
    await axios.post(
      `${this.rootPath}${IapRoutes.REFUND_TRANSACTION}`,
      {
        receiptId,
      },
      { headers: this.rootHeaders },
    );
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
  public async loadProduct(sku: string): Promise<IapProduct> {
    const {
      data: { product },
    } = await axios.get(
      `${this.rootPath}${IapRoutes.GET_PRODUCT_BY_SKU}?sku=${sku}`,
      { headers: this.rootHeaders },
    );

    return product;
  }
}

export interface IIAP extends IAP {}
