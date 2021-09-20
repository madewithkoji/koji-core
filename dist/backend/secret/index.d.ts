import { Base, BackendConfigurationInput } from '../base';
/**
 * Handles sensitive data used in your Koji app.
 */
export declare class Secret extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * Instantiates the Secret class.
     *
     * @param   config
     *
     * @example
     * ```javascript
     * const secret = new KojiBackend.Secret({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Resolves sensitive data that was {@doclink core-frontend-remix#encryptValue | stored as an encrypted value}.
     *
     * @param   keyPath  Encrypted value.
     * @return           Decrypted value.
     *
     * @example
     * ```javascript
     * const decryptedValue = await secret.resolveValue(encryptedValue);
     * ```
     */
    resolveValue<T>(keyPath: string): Promise<T>;
    /**
     * Generates a signed URL for securely serving a file, without exposing the permanent URI.
     * This method provides additional security against sharing or rehosting of protected content.
     *
     * @param   resource        Full URL of the resource. If the resource is an image hosted on the  Koji CDN, you can pass in query parameters to transform it. For example, resize or crop the image.
     * @param   expireSeconds   Amount of time for which the signed URL remains valid, in seconds. If undefined, signed videos expire after 1 hour, and any other resource expires after 5 minutes.
     * @return                  Signed URL for the resource.
     *
     * @example
     * ```javascript
     * const temporaryImagePath = await secret.generateSignedUrl('https://images.koji-cdn.com/e83eaff0-279f-4403-951b-e56507af923d/userData/emfga-icon.png');
     *
     * // Blur the image
     * const temporaryBlurredImagePath = await secret.generateSignedUrl('https://images.koji-cdn.com/e83eaff0-279f-4403-951b-e56507af923d/userData/emfga-icon.png?blur=10');
     * ```
     */
    generateSignedUrl(resource: string, expireSeconds?: number): Promise<string>;
}