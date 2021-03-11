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
export declare class Remix extends KojiBridge {
    private values;
    private isInitialized;
    private hasReceivedReadyResponse;
    constructor();
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
    init(remixData: any): void;
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
    get<T>(path?: string[], defaultValue?: T): any | T;
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
    set(newValue: Object): Promise<boolean>;
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
    overwrite(newValues: Object): Promise<boolean>;
    /**
     * Advances the Koji from remix to preview.
     *
     * @example
     * ```javascript
     * <button onClick={() => Koji.remix.finish()}>Next</button>
     * ```
     */
    finish(): void;
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
    encryptValue(rawValue: any): Promise<string>;
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
    decryptValue(encryptedValue: any): Promise<string>;
    /**
     * Sends an event to update the preview with the current remix data.
     *
     * @return  [description]
     */
    private sendValues;
}
export declare const remix: Remix;