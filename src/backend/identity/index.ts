import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

export enum AuthRoutes {
  GET_GRANT = '/v1/apps/auth/consumer/getGrantForToken',
  GET_ROLE = '/v1/apps/auth/consumer/getRoleForToken',
  PUSH_NOTIFICATION = '/v1/apps/auth/consumer/pushNotification',
}

export enum UserRole {
  ADMIN = 'admin',
  UNKNOWN = 'unknown',
  USER = 'user',
}

export interface User {
  id: string;
  attributes: {[index: string]: any};
  dateCreated: string;
  pushNotificationsEnabled: boolean;
  role: UserRole;
}

export interface PushNotification {
  appName: string;
  icon: string;
  message: string;
  ref?: string;
}

export class Identity extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
   * @param config Information about the project
   * @param config.projectId The projectId (This will override data passed through res)
   * @param config.projectToken The projectToken (This will override data passed through res)
   * @param config.res An express response object (Used in conjunction with KojiBackend.middleware)
   */
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
  public async pushNotificationToUser(userId: string, notification: PushNotification): Promise<void> {
    const { data } = await axios.post(`${this.rootPath}${AuthRoutes.PUSH_NOTIFICATION}`, {
      headers: this.rootHeaders,
      data: {
        destination: userId,
        notification,
      },
    });

    return data;
  }

  @server
  public async pushNotificationToOwner(notification: PushNotification): Promise<void> {
    const { data } = await axios.post(`${this.rootPath}${AuthRoutes.PUSH_NOTIFICATION}`, {
      headers: this.rootHeaders,
      data: {
        destination: 'owner',
        notification,
      },
    });

    return data;
  }

  @server
  public async resolveUserFromToken(token: UserToken): Promise<User> {
    const { data: { role } } = await axios.post(`${this.rootPath}${AuthRoutes.GET_ROLE}`, {
      headers: {
        ...this.rootHeaders,
        'X-Koji-Auth-Callback-Token': token,
      },
    });

    const { data: { grant } } = await axios.post(`${this.rootPath}${AuthRoutes.GET_ROLE}`, {
      headers: {
        ...this.rootHeaders,
        'X-Koji-Auth-Callback-Token': token,
      },
    });

    return {
      id: grant.userId,
      attributes: grant.attributes,
      dateCreated: grant.dateCreated,
      pushNotificationsEnabled: grant.pushNotificationsEnabled,
      role,
    };
  }
}
