import { Response } from 'express';
import axios from 'axios';
import { server } from '../@decorators/server';

export enum ApiEndpoints {
  TEST = 'http://localhost:3129',
  PRODUCTION = 'https://database.api.gokoji.com',
}

export enum ApiRoutes {
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

export class Database {
  private projectId: string;
  private projectToken: string;
  private rootPath: string;
  private rootHeaders: Object;

  constructor(res: Response) {
    this.projectId = res.locals.projectId || process.env.KOJI_PROJECT_ID;
    this.projectToken = res.locals.projectToken || process.env.KOJI_PROJECT_TOKEN;

    this.rootPath = process.env.NODE_TEST ? ApiEndpoints.TEST : ApiEndpoints.PRODUCTION;

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get a document from a collection
   * @param collection Name of the collection
   * @param documentName Key where the document is stored
   */
  @server
  public async get<T>(collection: string, documentName?: string | null): Promise<T> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.GET}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentName,
      },
    });
    return data.document;
  }

  /**
   * Retrieve all of the collections that have been created.
   */
  public async getCollections(): Promise<string[]> {
    const {
      data: { collections = [] },
    } = await axios(`${this.rootPath}${ApiRoutes.GET_COLLECTIONS}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {},
    });

    return collections;
  }

  /**
   * Search for a particular document inside a collection using a key value match.
   * @param {string} collection The name of the collection
   * @param {string} queryKey The key to search against
   * @param {string} queryValue The key value to match
   */
  public async search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.SEARCH}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        queryKey,
        queryValue,
      },
    });

    return data;
  }

  public async getWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValue: string,
  ): Promise<T> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.GET}`, {
      headers: this.rootHeaders,
      method: 'POST',
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

  public async getAll<T>(collection: string, documentNames: string[]): Promise<T[]> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.GET_ALL}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentNames,
      },
    });

    return data;
  }

  public async getAllWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValues: string[],
  ): Promise<T[]> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.GET_ALL_WHERE}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        predicateKey,
        predicateOperation,
        predicateValues,
      },
    });

    return data.results;
  }

  /**
   * Set a document in a collection
   * @param collection Name of the collection
   * @param documentName Key where the document is stored
   * @param documentBody Body of the document
   */
  @server
  public async set(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.SET}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  public async update(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.UPDATE}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  public async arrayPush(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.ARRAY_PUSH}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  public async arrayRemove(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.ARRAY_REMOVE}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentBody,
        documentName,
      },
    });

    return data;
  }

  public async delete(collection: string, documentName: string): Promise<boolean | void> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.DELETE}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentName,
      },
    });

    return data;
  }
}

export interface IDatabase extends Database {}
