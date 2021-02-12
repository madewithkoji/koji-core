import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

export enum IapRoutes {
  GET_PRODUCT_BY_SKU = '/v1/iap/provider/getProductBySku',
  RESOLVE_RECEIPTS = '/v1/iap/consumer/resolveReceipts',
  RESOLVE_RECEIPT_BY_ID = '/v1/iap/consumer/resolveReceiptById',
  RESOLVE_RECEIPTS_BY_SKU = '/v1/iap/consumer/resolveReceiptsBySku',
  UPDATE_RECEIPT = '/v1/iap/consumer/updateReceiptAttributes',
}

export type UserToken = string;

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
 * Implements in-app purchases for the backend of your Koji. For more information, see
 * [[https://developer.withkoji.com/reference/packages/withkoji-koji-iap-package | the in-app purchases package reference]].
 */
export class IAP extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
   * Instantiates [[IAP]].
   *
   * @param   res
   *
   * @example
   * ```javascript
   * const iap = new KojiBackend.IAP({ res });
   * ```
   */
  constructor(config: BackendConfigurationInput) {
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
  public async resolveReceiptsByUserToken(userToken: UserToken): Promise<IapReceipt[] | null> {
    try {
      const { data: { receipts = [] } } = await axios.post(
        `${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS}`,
        {},
        {
          headers: {
            ...this.rootHeaders,
            'X-Koji-Iap-Callback-Token': userToken,
          },
        },
      );

      return receipts;
    } catch (err) {
      console.log('Error: ', err);
      return null;
    }
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
  public async resolveReceiptById(receiptId: string): Promise<IapReceipt | null> {
    try {
      const { data: { receipt } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPT_BY_ID}`, { receiptId }, { headers: this.rootHeaders });

      return receipt;
    } catch (err) {
      console.log('Error: ', err);
      return null;
    }
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
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[] | null> {
    try {
      const { data: { receipts } } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS_BY_SKU}`, { sku }, { headers: this.rootHeaders });

      return receipts;
    } catch (err) {
      console.log('Error: ', err);
      return null;
    }
  }

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
  public async updateReceipt(receiptId: string, attributes: { [index: string]: any }, notificationMessage?: string): Promise<any> {
    try {
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
    } catch (err) {
      throw new Error('Service error');
    }
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
    try {
      const { data } = await axios.get(`${this.rootPath}${IapRoutes.GET_PRODUCT_BY_SKU}?appId=${this.projectId}&sku=${sku}`, { headers: this.rootHeaders });

      return data;
    } catch (err) {
      return null;
    }
  }
}

export interface IIAP extends IAP {}
