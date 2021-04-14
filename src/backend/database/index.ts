import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';

/**
 * API routes for database methods.
 */
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

/**
 * Available operator types for database comparisons.
 */
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

/**
 * Possible response values when interacting with the database API.
 */
export enum DatabaseHttpStatusCode {
  /**
   * Standard response for successful HTTP requests.
   */
  OK = 200,

  /**
   * The server cannot or will not process the request due to an apparent client error
   *
   * One of the following error conditions:
   * Unable to parse data.
   * Missing data.
   * The request attempts data that is too large.
   * The data contains invalid child names as part of the path.
   * The data path is too long.
   * The request contains an unrecognized server value.
   * The request does not support one of the query parameters that is specified.
   * The request mixes query parameters with a shallow request.
   */
  BAD_REQUEST = 400,

  /**
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
   * been provided.
   *
   * One of the following error conditions:
   * The user token has expired or is missing.
   * The user token used in the request is invalid.
   */
  UNAUTHORIZED = 401,

  /**
   * The specified Database was not found.
   */
  NOT_FOUND = 404,

  /**
   * The request's specified ETag value in the if-match header did not match the server's value.
   */
  PRECONDITION_FAILED = 412,

  /**
   * A server error occurred.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * The specified Database is temporarily unavailable, which means the request was not attempted.
   */
  SERVICE_UNAVAILABLE = 503,
}

/**
 * Implements a Koji database for the backend of your Koji.
 *
 * A Koji database is a key-value store that is included with each project on Koji.
 * For more information, see the {@doclink koji-database | Koji database developer guide}.
 */
export class Database extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
   * Increments a numeric value by a specified amount. You can use this method to increment numeric values in the database with a single request. See [[update]].
   *
   * @example
   * ```javascript
   * // Increment a value (using a positive integer)
   * const updatedDoc = await database.update('collection', 'document', {
   *   'myValue': KojiBackend.Database.valueTypes.increment(1),
   * }, true);
   *
   * // Decrement a value (using a negative integer)
   * const updatedDoc = await database.update('collection', 'document', {
   *   'myValue': KojiBackend.Database.valueTypes.increment(-1),
   * }, true);
   * ```
   */
  public static valueTypes = {
    increment: (number: number) => ({
      _updateType: 'increment',
      value: number,
    }),
  };

  /**
   * Instantiates the Database class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const database = new KojiBackend.Database({ res });
   * ```
   */
  public constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://database.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Gets the specified database entry or collection of entries.
   *
   * @typeParam T              Data from a Koji database collection.
   * @param     collection     Name of the collection.
   * @param     documentName   Name of the entry.
   * @return                   Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.get('myCollection');
   * const myEntry = await database.get('myCollection','myDoc');
   * ```
   */
  @server
  public async get<T>(collection: string, documentName?: string | null): Promise<T> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.GET}`,
      {
        collection,
        documentName,
      },
      { headers: this.rootHeaders },
    );
    return data.document;
  }

  /**
   * Gets a list of all collections available in the database.
   *
   * @return  List containing the names of the collections.
   *
   * @example
   * ```javascript
   * const collections = await database.getCollections();
   * ```
   */
  @server
  public async getCollections(): Promise<string[]> {
    const {
      data: { collections = [] },
    } = await axios.post(`${this.rootPath}${DatabaseRoutes.GET_COLLECTIONS}`, {}, { headers: this.rootHeaders });

    return collections;
  }

  /**
   * Searches a collection for records that match the specified search criteria.
   * The search criteria are the search field and the search value.
   *
   *
   * @typeParam T              Data from a Koji database collection.
   * @param     collection     Name of the collection.
   * @param     queryKey       Name of the search field.
   * @param     queryValue     Search value.
   * @return                   Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.search('myCollection', 'myField', 'mySearchValue');
   * ```
   */
  @server
  public async search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.SEARCH}`,
      {
        collection,
        queryKey,
        queryValue,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Searches a collection for records that satisfy the specified predicate.
   * The predicate is specified using predicateKey, predicateOperator, and predicateValue.
   *
   * @typeParam T                       Data from a Koji database collection.
   * @param     collection              Name of the collection.
   * @param     predicateKey            Name of the field to search.
   * @param     predicateOperation      Operator to use for the search.
   * @param     predicateValue          Search value.
   * @return                            Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getWhere('myCollection',
   *  'myField', 'myOperator, 'mySearchValue');
   * ```
   */
  @server
  public async getWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValue: string): Promise<T> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.GET}`,
      {
        collection,
        predicate: {
          key: predicateKey,
          operation: predicateOperation,
          value: predicateValue,
        },
      },
      { headers: this.rootHeaders },
    );

    return data.document;
  }

  /**
   * Gets the specified database entries.
   *
   * @typeParam T                   Data from a Koji database collection.
   * @param     collection          Name of the collection.
   * @param     documentNames       Array of one or more entry names to retrieve.
   * @return                        Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getAll('myCollection', ['doc1', 'doc2']);
   * ```
   */
  @server
  public async getAll<T>(collection: string, documentNames: string[]): Promise<T[]> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.GET_ALL}`,
      {
        collection,
        documentNames,
      },
      { headers: this.rootHeaders },
    );

    return data.results;
  }

  /**
   * Searches a collection for records that satisfy the specified predicate.
   * The predicate is specified using predicateKey, predicateOperator, and predicateValues.
   *
   * @typeParam T                       Data from a Koji database collection.
   * @param     collection              Name of the collection.
   * @param     predicateKey            Name of a field in the collection.
   * @param     predicateOperation      Operator to use for the search.
   * @param     predicateValues         Array of one or more search values.
   * @return                            Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getAllWhere('myCollection',
   *  'myField', '==', ['mySearchValue1', 'mySearchValue2']);
   * ```
   */
  @server
  public async getAllWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValues: string[]): Promise<T[]> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.GET_ALL_WHERE}`,
      {
        collection,
        predicateKey,
        predicateOperation,
        predicateValues,
      },
      { headers: this.rootHeaders },
    );

    return data.results;
  }

  /**
   * Adds an entry to a database collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Name of the entry.
   * @param     documentBody        Data for the entry.
   * @param     returnDoc           Whether to return the updated entry as a response.
   * @return                        An HTTP status code indicating whether the request was successful, or the updated entry if `returnDoc` was set to `true`.
   *
   * @example
   * ```javascript
   * const myData = await database.set('myCollection', 'myDocument', {
   *  'myData1': 'myValue1',
   *  'myData2': 'myValue2'
   * });
   * ```
   */
  @server
  public async set(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.SET}`,
      {
        collection,
        documentBody,
        documentName,
        returnDoc,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Updates the specified data for an entry in the database collection. To increment numeric values with a single update request, you can use [[valueTypes | valueTypes.increment]].
   *
   * <p class="note">This method updates only the values that are specified in `documentBody`. If other values exist in the entry, they are not changed.
   * If no existing entry matches the `documentName`, a new entry is created with the specified `documentName` and `documentBody`.</p>
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Name of the entry.
   * @param     documentBody        New data.
   * @param     returnDoc           Whether to return the updated entry as a response.
   * @return                        An HTTP status code indicating whether the request was successful, or the updated entry if `returnDoc` was set to `true`.
   *
   * @example
   * ```javascript
   * const myData = await database.update('myCollection', 'myDocument', {
   *  'myData1': 'myValue1',
   *  'myData2': 'myValue2'
   * });
   * ```
   */
  @server
  public async update(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.UPDATE}`,
      {
        collection,
        documentBody,
        documentName,
        returnDoc,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Adds data onto arrays in an existing database entry.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Name of the entry.
   * @param     documentBody        Key-value pairs of arrays and the entries to add to them.
   * @param     returnDoc           Whether to return the updated entry as a response.
   * @return                        An HTTP status code indicating whether the request was successful, or the updated entry if `returnDoc` was set to `true`.
   *
   * @example
   * ```javascript
   * const doc = await database.arrayPush('myCollection', 'myDocument', {
   *  array1: 'newValue1',
   *  array2: 'newValue2',
   * }, true);
   *
   * // Updated document after arrayPush
   * doc = {
   *  array1: ['existingValue1', 'newValue1'],
   *  array2: ['existingValue2', 'newValue2'],
   * }
   * ```
   */
  @server
  public async arrayPush(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.ARRAY_PUSH}`,
      {
        collection,
        documentBody,
        documentName,
        returnDoc,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Removes data from an existing database entry.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Name of the entry.
   * @param     documentBody        Data to remove from the entry.
   * @param     returnDoc           Whether to return the updated entry as a response.
   * @return                        An HTTP status code indicating whether the request was successful, or the updated entry if `returnDoc` was set to `true`.
   *
   * @example
   * ```javascript
   * const isRemoved = await database.arrayRemove('myCollection', 'myDocument', {
   *  'myData1': 'myValue1',
   *  'myData2': 'myValue2'
   * });
   * ```
   */
  @server
  public async arrayRemove(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.ARRAY_REMOVE}`,
      {
        collection,
        documentBody,
        documentName,
        returnDoc,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Deletes a database entry from a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Name of the entry.
   * @return                        An HTTP status code indicating whether the request was successful.
   *
   * @example
   * ```javascript
   * const isDeleted = await database.delete('myCollection', 'myDocument');
   * ```
   */
  @server
  public async delete(collection: string, documentName: string): Promise<DatabaseHttpStatusCode> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.DELETE}`,
      {
        collection,
        documentName,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }
}

export interface IDatabase extends Database {}
