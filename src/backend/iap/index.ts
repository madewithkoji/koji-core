import { Response } from 'express';
import axios from 'axios';
import { server } from '../@decorators/server';

export enum IapRoutes {
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

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  @server
  public async resolveReceiptsByUserToken(userToken: UserToken): Promise<IapReceipt[]> {
    try {
      const { data } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS}`, {
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

  @server
  public async resolveReceiptById(receiptId: string): Promise<IapReceipt | null> {
    try {
      const { data } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPT_BY_ID}`, {
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

  @server
  public async resolveReceiptsBySku(sku: string): Promise<IapReceipt[]> {
    try {
      const { data } = await axios.post(`${this.rootPath}${IapRoutes.RESOLVE_RECEIPTS_BY_SKU}`, {
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

  public async updateReceipt(
    receiptId: string,
    attributes: { [index: string]: any },
    notificationMessage?: string,
  ): Promise<any> {
    try {
      const { data } = await axios.post(`${this.rootPath}${IapRoutes.UPDATE_RECEIPT}`, {
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
      const { data } = await axios.get(`${this.rootPath}${IapRoutes.GET_PRODUCT_BY_SKU}?appId=${this.projectId}&sku=${sku}`, {
        headers: this.rootHeaders,
      });

      return data;
    } catch (err) {
      return null;
    }
  }
}

export interface IIAP extends IAP {}
