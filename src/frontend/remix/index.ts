import deepmerge from 'deepmerge';
import { get } from '../../utils/get';
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
  private hasReceivedReadyResponse: boolean = false;

  constructor() {
    super();

    // After Koji.ready() is invoked, the platform will always respond with a `KojiPreview.IsRemixing`
    // message. This allows us to use an actual response from the platform to ensure that
    // finish and set aren't called before a ready() resolution.
    if (typeof window !== 'undefined') {
      this.execCallbackOnMessage(() => {
        this.hasReceivedReadyResponse = true;
      }, 'KojiPreview.IsRemixing');
    }
  }

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
  init(remixData: any) {
    if (!remixData) throw new Error('Unable to find remixData');

    if (this.isInitialized) {
      throw new Error('You are trying to initialize your remix data more than one time. Note that Koji.config() will automatically call this method.');
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
   * @param   path [path]   An array of keys to target a specific value in the object.
   * @param   defaultValue [defaultValue]   A value to return if no value exists at the targeted path.
   * @return  Object containing the current remix data.
   *
   * @example
   * ```javascript
   *
   * // Return the entire `remixData` object
   * const values = Koji.remix.get();
   *
   * // Return a particular value
   * const backgroundColor = Koji.remix.get(['colors', 'background']);
   *
   * // Return a particular value with a default if the value is not defined
   * const textColor = Koji.remix.get(['colors', 'text'], '#000000');
   * ```
   */
  @client
  public get<T>(path?: string[], defaultValue?: T): any | T {
    if (!path) return this.values;

    return get(this.values, path, defaultValue);
  }

  /**
   * Updates the specified values in the remix data.
   *
   * <p class="note">This method updates only the values that are specified in `newValue`. If other values exist, they not changed. To replace all remix data, use [[overwrite]].</p>
   *
   * @param   newValue      Key-value pairs to update in the remix data.
   * @return                Indicates whether the values were successfully updated.
   *
   * @example
   * ```javascript
   * await Koji.remix.set({'myColor': color});
   * ```
   */
  @client
  public set(newValue: Object): Promise<boolean> {
    if (!this.hasReceivedReadyResponse) throw new Error('It looks like you are trying to call the `Koji.remix.set()` method before calling `Koji.ready(). This will prevent data from being stored properly.`');

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
    if (!this.hasReceivedReadyResponse) throw new Error('It looks like you are trying to call the `Koji.remix.finish()` method before calling `Koji.ready(). This will result in unpredictable behavior in a remix preview.`');

    this.sendMessage({
      kojiEventName: 'KojiPreview.Finish',
    });
  }

  /**
   * Cancels the remix experience and navigates the user back to where they were before they started remixing. If the user has made changes, they will be prompted by the Koji platform to confirm this action.
   *
   * @example
   * ```javascript
   * <sbutton onCLick={() => Koji.remix.cancel()}>Cancel</button>
   */
  @client
  public cancel() {
    this.sendMessage({
      kojiEventName: 'KojiPreview.Cancel',
    });
  }

  /**
   * Stores sensitive data as an encrypted value. The sensitive data can only be accessed programmatically and is not available when the Koji is remixed.
   *
   * @param   rawValue       Value to encrypt.
   * @return                 Path where the encrypted value is stored. Use this value to [[decryptValue | decrypt the value]] on the frontend, for the creator, or to [[resolveValue | resolve the value]] on the backend, for other users.
   *
   * @example
   * ```javascript
   * const encryptPath = await Koji.remix.encryptValue(text);
   * ```
   */
  @client
  public async encryptValue(rawValue: any): Promise<string> {
    const data = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.EncryptValue',
        data: {
          plaintextValue: rawValue,
        },
      },
      'KojiPreview.ValueEncrypted',
    );

    return data.encryptedValue;
  }

  /**
   * Retrieves sensitive data that was [[encryptValue | stored as an encrypted value]].
   *
   * <p class="note">Only the creator of the Koji can access the decrypted value with this method. For example, to check that the value was entered correctly. To retrieve the value for other users, use [[resolveValue]] on the backend.</p>
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
  public async decryptValue(encryptedValue: any): Promise<string> {
    const data = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: 'KojiPreview.DecryptValue',
        data: {
          encryptedValue,
        },
      },
      'KojiPreview.ValueDecrypted',
    );

    return data.decryptedValue;
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
