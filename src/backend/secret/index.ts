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
 * Implements a class for handling secret keys in your Koji.
 */
export class Secret extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
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
