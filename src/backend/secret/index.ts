import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

/**
 * API routes for secret/keystore methods.
 */
enum SecretRoutes {
  KEYSTORE_GET = '/v1/keystore/get',
  CREATE_SIGNED_REQUEST = '/v1/cdn/signedRequest/create',
}

/**
 * Handles sensitive data used in your Koji template.
 */
export class Secret extends Base {
  private rootPath: string;
  private rootHeaders: Object;

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
  public constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Resolves sensitive data that was {@doclink core-frontend-remix#encryptValue | stored as an encrypted value}.
   *
   * @param   keyPath  Path where the encrypted value is stored.
   * @return           Decrypted value.
   *
   * @example
   * ```javascript
   * const keyValue = await secret.resolveValue<string>(SecretRoutes.KEYSTORE_GET + "/mySecretKey");
   * ```
   */
  @server
  public async resolveValue<T>(keyPath: string): Promise<T> {
    const { data } = await axios.post(
      `${this.rootPath}${SecretRoutes.KEYSTORE_GET}`,
      {
        scope: this.projectId,
        token: this.projectToken,
        keyPath,
      },
      {
        headers: this.rootHeaders,
      },
    );

    return data.decryptedValue;
  }

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
  @server
  public async generateSignedUrl(resource: string, expireSeconds?: number): Promise<string> {
    const { data } = await axios.post(
      `${this.rootPath}${SecretRoutes.CREATE_SIGNED_REQUEST}`,
      {
        resource,
        expireSeconds,
      },
      { headers: this.rootHeaders },
    );

    return data.url;
  }
}
