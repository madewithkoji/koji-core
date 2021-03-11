import { Base, BackendConfigurationInput } from '../base';
/**
 * Implements a class for handling secret keys in your Koji.
 */
export declare class Secret extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * @param   config
     *
     * @example
     * ```javascript
     * const secret = new KojiBackend.Secret({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Gets the value for a secret key.
     *
     * @param   keyPath  Path for secret key
     * @return           Key value.
     *
     * @example
     * ```javascript
     * const keyValue = await secret.resolveValue<string>(SecretRoutes.KEYSTORE_GET + "/mySecretKey");
     * ```
     */
    resolveValue<T>(keyPath: string): Promise<T>;
    /**
     * Creates a signed URL.
     *
     * @param   resource        Path to resource
     * @param   expireSeconds   Expiration in seconds
     * @return                  URL for resource.
     *
     * @example
     * ```javascript
     * const secretPath = await secret.generateSignedUrl();
     * ```
     */
    generateSignedUrl(resource: string, expireSeconds?: number): Promise<string>;
}
