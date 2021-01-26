import deepmerge from 'deepmerge';
import { client } from '../@decorators/client';
import { KojiBridge } from '../kojiBridge';

declare global {
  interface Window {
    /** Enables Koji's proxy server to write remix-specific values to the KOJI_OVERRIDES property. */
    KOJI_OVERRIDES: any;
  }
}
/** Communicates changes to remix data. */
export interface ValueChanged {
  /** Path of the changed value. */
  path: string[];
  /** New value. */
  newValue: any;
  /** Previous value. */
  savedValue: any;
}

/**
 * Manages the remixing experience for your Koji.
 */
export class Remix extends KojiBridge {
  private values: any = {};
  private isInitialized: boolean = false;

  /**
   * Initializes the remix data for the Koji with default values.
   *
   * @param   kojiConfig    Object containing the default values for your Koji.
   *
   * @example
   * ```javascript
   * Koji.remix.init(require('../../../koji.json'));
   * ```
   */
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

  /**
   * Gets the remix data for the Koji.
   *
   * @return  Object containing the current remix data.
   *
   * @example
   * ```javascript
   * const defaultValues = Koji.remix.get();
   * ```
   */
  @client
  public get() {
    return this.values;
  }

  /**
   * Updates the specified values in the remix data.
   * <p class="note">This method updates only the values that are specified in `newValue`. If other values exist, they not changed. To replace all remix data, use [[overwrite]].</p>
   * @param   newValue      Key-value pairs to update in the remix data.
   * @return                Indicates whether the values were successfully updated.
   * @example
   * ```javascript
   * await Koji.remix.set({'myColor': color});
   * ```
   */
  @client
  public set(newValue: Object): Promise<boolean> {
    this.values = deepmerge(this.values, newValue, {
      arrayMerge: (dest, source) => source,
    });
    return this.sendValues();
  }

  /**
   * Replaces all remix data with the specified object.
   *
   * <p class="note">This method overwrites all existing values in the remix data. To update specific values only, use [[set]].</p>
   *
   * @param   newValues Object containing the new remix data for the Koji.
   * @return            Indicates whether the remix data was successfully replaced.
   *
   * @example
   * ```javascript
   * await Koji.remix.overwrite({'myColor': color, 'myText': text});
   * ```
   */
  @client
  public overwrite(newValues: Object): Promise<boolean> {
    this.values = newValues;
    return this.sendValues();
  }

  /**
   * Advances the Koji from remix to preview.
   *
   * @example
   * ```javascript
   * <button onClick={() => Koji.remix.finish()}>Next</button>
   * ```
   */
  @client
  public finish() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.Finish',
    });
  }

  /**
   * Stores sensitive data as an encrypted value. The sensitive data can only be accessed programmatically and is not available when the Koji is remixed.
   *
   * @param   plaintextValue Value to encrypt.
   * @return                 Path where the encrypted value is stored. Use this value to {@link decryptValue | decrypt the value} on the frontend, for the creator, or to {@link resolveValue | resolve the value} on the backend, for other users.
   *
   * @example
   * ```javascript
   * const encryptPath = await Koji.remix.encryptValue(text);
   * ```
   */
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

  /**
   * Retrieves sensitive data that was {@link encryptValue | stored as an encrypted value}.
   *
   * <p class="note">Only the creator of the Koji can access the decrypted value with this method. For example, to check that the value was entered correctly. To retrieve the value for other users, use {@link resolveValue} on the backend.</p>
   *
   * @param   encryptedValue Path where the encrypted value is stored.
   * @return                 Decrypted value.
   *
   * @example
   * ```javascript
   * const value = await Koji.remix.decryptValue(encryptPath);
   * ```
   */
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

  /**
   * Sends an event to update the preview with the current remix data.
   *
   * @return  [description]
   */
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
