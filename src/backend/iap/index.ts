import { Response } from 'express';
import axios from 'axios';
import { server } from '../@decorators/server';

export enum ApiEndpoints {
  TEST = 'http://localhost:3129',
  PRODUCTION = 'https://database.api.gokoji.com',
}

export enum ApiRoutes {
  GET_PRODUCT_BY_SKU = '/v1/iap/provider/getProductBySku',
  RESOLVE_RECEIPTS = '/v1/iap/consumer/resolveReceipts',
  RESOLVE_RECEIPT_BY_ID = '/v1/iap/consumer/resolveReceiptById',
  RESOLVE_RECEIPTS_BY_SKU = '/v1/iap/consumer/resolveReceiptsBySku',
  UPDATE_RECEIPT = '/v1/iap/consumer/updateReceiptAttributes',
}

export type UserToken = string;

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

export class IAP {
  private projectId: string;
  private projectToken: string;
  private rootPath: string;
  private rootHeaders: Object;

  constructor(res: Response) {
    this.projectId = res.locals.projectId || process.env.KOJI_PROJECT_ID;
    this.projectToken = res.locals.projectToken || process.env.KOJI_PROJECT_TOKEN;

    this.rootPath = process.env.NODE_TEST ? ApiEndpoints.TEST : ApiEndpoints.PRODUCTION;

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Resolve all of the receipts for a particular user.
   * @param userToken The user's token (generated client side with the Koji.auth.getToken method)
   */
  @server
  public async resolveReceiptsByUserToken(userToken: UserToken): Promise<IapReceipt[]> {
    try {
      const { data } = await axios.post(`${this.rootPath}${ApiRoutes.RESOLVE_RECEIPTS}`, {
        headers: {
          ...this.rootHeaders,
          'X-Koji-Iap-Callback-Token': userToken,
        },
      });

      return data;
    } catch (err) {
      return [];
    }
  }

  /**
   * Look up a receipt by the receipt's id.
   * @param receiptId The id of the receipt.
   */
  @server
  public async resolveReceiptById(receiptId: string): Promise<IapReceipt | null> {
    try {
      const { data } = await axios.post(`${this.rootPath}${ApiRoutes.RESOLVE_RECEIPT_BY_ID}`, {
        headers: this.rootHeaders,
        data: {
          receiptId,
        },
      });

      return data;
    } catch (err) {
      return null;
    }
  }

  /**
   * Resolve all receipts for a particular sku.
   * @param sku The product's sku.
   */
  @server
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[]> {
    try {
      const { data } = await axios.post(`${this.rootPath}${ApiRoutes.RESOLVE_RECEIPTS_BY_SKU}`, {
        headers: this.rootHeaders,
        data: {
          sku,
        },
      });

      return data;
    } catch (err) {
      return [];
    }
  }

  /**
   * Update a receipt with additional metadata & provide a message for the automatically-generated notification.
   * @param receiptId The id of the receipt that will be updated.
   * @param attributes Key/value pairs of the data you would like to add/update.
   * @param notificationMessage An optional message that will be included with the automatically-generated notification.
   */
  public async updateReceipt(
    receiptId: string,
    attributes: { [index: string]: any },
    notificationMessage?: string,
  ): Promise<any> {
    try {
      const { data } = await axios.post(`${this.rootPath}${ApiRoutes.UPDATE_RECEIPT}`, {
        headers: this.rootHeaders,
        data: {
          receiptId,
          attributes,
          notificationMessage,
        },
      });

      return data;
    } catch (err) {
      throw new Error('Service error');
    }
  }

  public async loadProduct(sku: string) {
    try {
      const { data } = await axios.get(`${this.rootPath}${ApiRoutes.GET_PRODUCT_BY_SKU}?appId=${this.projectId}&sku=${sku}`, {
        headers: this.rootHeaders,
      });

      return data;
    } catch (err) {
      return null;
    }
  }
}

export interface IIAP extends IAP {}
