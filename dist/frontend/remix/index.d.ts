import { KojiBridge } from '../kojiBridge';
declare global {
    interface Window {
        /** Enables Koji's proxy server to write customized values to the KOJI_OVERRIDES property. */
        KOJI_OVERRIDES: any;
        /** Private reference to the Koji Feed Key, which is saved in a URL fragment when the Koji app first loads. */
        KOJI_FEED_KEY?: string;
    }
}
/** Communicates changes to the customization data. */
export interface ValueChanged {
    /** Path of the changed value. */
    path: string[];
    /** New value. */
    newValue: any;
    /** Previous value. */
    savedValue: any;
}
/**
 * Manages the customization experience for your Koji app.
 */
export declare class Remix extends KojiBridge {
    private values;
    private isInitialized;
    private hasReceivedReadyResponse;
    constructor();
    /**
     * Initializes the Koji app's customization data with default values.
     *
     * NOTE: In most cases, you do not need to call this method manually because it is automatically called when you initialize the package with `Koji.config`.
     * Use this method only if you want to use the Remix class by itself, without any other classes in the package.
     *
     * @param   remixData    Object containing the default values for your Koji app.
     *
     * @example
     * ```javascript
     * import { remixData } from '../../koji.json;
     *
     * Koji.remix.init(remixData));
     * ```
     */
    init(remixData: any): void;
    /**
     * Gets the customization data for the Koji app.
     *
     * @param   path   Array of keys to target a specific value in the object.
     * @param   defaultValue   Value to return if no value exists at the targeted path.
     * @return  Object containing the current customization data.
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
     * Updates the specified values in the customization data.
     *
     * NOTE: This method updates only the values that are specified in `newValue`. If other values exist, they are not changed. To replace all customization data, use [[overwrite]].
     *
     * @param   newValue      Key-value pairs to update in the customization data.
     * @return                Indicates whether the values were successfully updated.
     *
     * @example
     * ```javascript
     * await Koji.remix.set({'myColor': color});
     * ```
     */
    set(newValue: Object): Promise<boolean>;
    /**
     * Replaces all customization data with the specified object.
     *
     * NOTE: This method overwrites all existing values in the customization data.
     * To update specific values only, use [[set]].
     *
     * @param   newValues Object containing the new customization data for the Koji app.
     * @return            Indicates whether the customization data was successfully replaced.
     *
     * @example
     * ```javascript
     * await Koji.remix.overwrite({'myColor': color, 'myText': text});
     * ```
     */
    overwrite(newValues: Object): Promise<boolean>;
    /**
     * Advances the Koji app's mode from customization to preview.
     *
     * @example
     * ```html
     * <button onClick={() => Koji.remix.finish()}>
     *  Next
     * </button>
     * ```
     */
    finish(): void;
    /**
     * Cancels the customization experience and returns to where the user was before they started customization. If the user has made changes, they are prompted to confirm the cancellation.
     *
     * @example
     * ```javascript
     * Koji.remix.cancel();
     * ```
     */
    cancel(): void;
    /**
     * Stores sensitive data as an encrypted value. The sensitive data can only be accessed programmatically and is not available when the Koji app is configured.
     *
     * @param   rawValue       Value to encrypt.
     * @return                 Encrypted value. Use this value to [[decryptValue | decrypt the value]] on the frontend, for the creator, or to {@doclink core-backend-secret#resolveValue | resolve the value} on the backend, for other users.
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
     * NOTE: Only the owner of the Koji app can access the decrypted value with this method. For example, to check that the value was entered correctly. To retrieve the value for other users, use {@doclink core-backend-secret#resolveValue | Secret.resolveValue} on the backend.
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
     * Sends an event to update the preview with the current customization data.
     *
     * @return
     */
    private sendValues;
}
export declare const remix: Remix;
