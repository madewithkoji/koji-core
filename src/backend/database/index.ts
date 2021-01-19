import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

export enum ApiEndpoints {
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

export class Database extends Base {
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

    this.rootPath = ApiEndpoints.PRODUCTION;

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
    const { data } = await axios.post(`${this.rootPath}${ApiRoutes.GET}`, {
      headers: this.rootHeaders,
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

  /**
   * Get a single document that matches the key/operator/value predicate
   * @param collection The collection to query
   * @param predicateKey The key/field where the value is stored
   * @param predicateOperation The operator for comparison
   * @param predicateValue The comparison value
   */
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

  /**
   * Get all of the documents in a given collection that match a supplied name
   * @param collection The collection to query
   * @param documentNames An array of ids
   */
  public async getAll<T>(collection: string, documentNames: string[]): Promise<T[]> {
    const { data } = await axios(`${this.rootPath}${ApiRoutes.GET_ALL}`, {
      headers: this.rootHeaders,
      method: 'POST',
      data: {
        collection,
        documentNames,
      },
    });

    return data.results;
  }

  /**
   * Get all of the documents that match the key/operator/value predicate
   * @param collection The collection to query
   * @param predicateKey The key/field where the value is stored
   * @param predicateOperation The operator for comparison
   * @param predicateValue The comparison value
   */
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

  /**
   * Update the values of an existing document
   * @param collection The collection to target
   * @param documentName The id of the document
   * @param documentBody The updated key/value pairs to merge into the document
   */
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

  /**
   * Push a new value into an array on an existing doc. If the array does not exist, it will be created.
   * @param collection The collection to query
   * @param documentName The id of the document to update
   * @param documentBody A set of key/value pairs. The key should match the document key where the array is stored. The value will be pushed into that array.
   */
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

  /**
   * Remove a value from an array on an existing doc.
   * @param collection The collection to query
   * @param documentName The id of the document to update
   * @param documentBody A set of key/value pairs. The key should match the document key where the array is stored. All entries that match the value will be removed from the array.
   */
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

  /**
   * Delete a document. Note: This action is irreversible!
   * @param collection The collection to query
   * @param documentName The id of the document to delete
   */
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
