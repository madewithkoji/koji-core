import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

enum SecretRoutes {
  KEYSTORE_GET = '/v1/keystore/get',
  CREATE_SIGNED_REQUEST = '/v1/cdn/signedRequest/create',
}

export class Secret extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

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

    console.log('d', data);

    return data.decryptedValue;
  }

  @server
  public async generateSignedUrl(resource: string, expireSeconds?: number): Promise<string> {
    const { data } = await axios.post(`${this.rootPath}${SecretRoutes.CREATE_SIGNED_REQUEST}`, {
      headers: this.rootHeaders,
      data: {
        resource,
        expireSeconds,
      },
    });

    return data.url;
  }
}
