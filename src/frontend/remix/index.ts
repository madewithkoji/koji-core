import deepmerge from 'deepmerge';
import { client } from '../@decorators/client';
import { KojiBridge } from '../kojiBridge';

declare global {
  interface Window {
    KOJI_OVERRIDES: any;
  }
}

export interface ValueChanged {
  path: string[];
  newValue: any;
  savedValue: any;
}

/**
 * Manages the remixing experience for your Koji.
 */
export class Remix extends KojiBridge {
  private values: any = {};
  private isInitialized: boolean = false;

  @client
  public init(kojiConfig: any) {
    const { remixData } = kojiConfig;

    if (!remixData) throw new Error('Unable to find remixData');

    if (this.isInitialized) {
      console.warn('You are trying to initialize your remix data more than one time.');
      return;
    }

    this.isInitialized = true;

    let overrides = {};
    if (window.KOJI_OVERRIDES && window.KOJI_OVERRIDES.overrides) {
      overrides = window.KOJI_OVERRIDES.overrides.remixData || {};
    }

    this.values = deepmerge(remixData, overrides, {
      arrayMerge: (dest, source) => source,
    });
  }

  @client
  public get() {
    return this.values;
  }

  @client
  public set(newValue: Object): Promise<boolean> {
    this.values = deepmerge(this.values, newValue, {
      arrayMerge: (dest, source) => source,
    });
    return this.sendValues();
  }

  @client
  public overwrite(newValues: Object): Promise<boolean> {
    this.values = newValues;
    return this.sendValues();
  }

  @client
  public finish() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.Finish',
    });
  }

  @client
  public async encryptValue(plaintextValue: string): Promise<string> {
    const data: string = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.EncryptValue',
        data: {
          plaintextValue,
        },
      },
      'KojiPreview.ValueEncrypted',
    );

    return data;
  }

  @client
  public async decryptValue(encryptedValue: string) {
    const data: string = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.DecryptValue',
        data: {
          encryptedValue,
        },
      },
      'KojiPreview.ValueDecrypted',
    );

    return data;
  }

  private async sendValues() {
    const data: ValueChanged = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.SetValue',
        data: {
          path: ['remixData'],
          newValue: this.values,
          skipUpdate: false,
        },
      },
      'KojiPreview.DidChangeVcc',
    );

    return !!data;
  }
}

export const remix = new Remix();
