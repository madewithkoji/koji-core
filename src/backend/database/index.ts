import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

export enum DatabaseRoutes {
  ARRAY_PUSH = '/v1/store/update/push',
  ARRAY_REMOVE = '/v1/store/update/remove',
  DELETE = '/v1/store/delete',
  GET = '/v1/store/get',
  GET_ALL = '/v1/store/getAll',
  GET_ALL_WHERE = '/v1/store/getAllWhere',
  GET_COLLECTIONS = '/v1/store/getCollections',
  SEARCH = '/v1/store/search',
  SET = '/v1/store/set',
  UPDATE = '/v1/store/update',
}

export enum PredicateOperator {
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL_TO = '<=',
  EQUAL_TO = '==',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL_TO = '>=',
  NOT_EQUAL_TO = '!=',
  ARRAY_CONTAINS = 'array-contains',
  ARRAY_CONTAINS_ANY = 'array-contains-any',
  IN = 'in',
  NOT_IN = 'not-in',
}

export class Database extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://database.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  @server
  public async get<T>(collection: string, documentName?: string | null): Promise<T> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentName,
      },
    });
    return data.document;
  }

  @server
  public async getCollections(): Promise<string[]> {
    const {
      data: { collections = [] },
    } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET_COLLECTIONS}`, {
      headers: this.rootHeaders,
      data: {},
    });

    return collections;
  }

  @server
  public async search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.SEARCH}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        queryKey,
        queryValue,
      },
    });

    return data;
  }

  @server
  public async getWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValue: string,
  ): Promise<T> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        predicate: {
          key: predicateKey,
          operation: predicateOperation,
          value: predicateValue,
        },
      },
    });

    return data.document;
  }

  @server
  public async getAll<T>(collection: string, documentNames: string[]): Promise<T[]> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET_ALL}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentNames,
      },
    });

    return data.results;
  }

  @server
  public async getAllWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValues: string[],
  ): Promise<T[]> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET_ALL_WHERE}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        predicateKey,
        predicateOperation,
        predicateValues,
      },
    });

    return data.results;
  }

  @server
  public async set(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.SET}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  @server
  public async update(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.UPDATE}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  @server
  public async arrayPush(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.ARRAY_PUSH}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  @server
  public async arrayRemove(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.ARRAY_REMOVE}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  @server
  public async delete(collection: string, documentName: string): Promise<boolean | void> {
    const { data } = await axios.post(`${this.rootPath}${DatabaseRoutes.DELETE}`, {
      headers: this.rootHeaders,
      data: {
        collection,
        documentName,
      },
    });

    return data;
  }
}

export interface IDatabase extends Database {}
