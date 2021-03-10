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
 * Implements a Koji database for the backend of your Koji. For more information, see [[https://developer.withkoji.com/docs/develop/koji-database | the Koji database developer guide]].
 */
export class Database extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  /**
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
   * const myData = await database.search<'myClass'>('myCollection', 'myField', 'mySearchValue');
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
   * @param     predicateKey            Name of a field in the collection.
   * @param     predicateOperation      An operator such as '=', '<>', '>', etc.
   * @param     predicateValue          Search value.
   * @return                            Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getWhere<'myClass'>('myCollection', 'myField', 'myOperator, 'mySearchValue');
   * ```
   */
  @server
  public async getWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValue: string,
  ): Promise<T> {
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
   * Searches a collection for the documents whose names are included in an array of document names.
   *
   * @typeParam T                   Data from a Koji database collection.
   * @param     collection          Name of the collection.
   * @param     documentNames       Array of one or more document names
   * @return                        Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getAll<'myClass'>('myCollection', ['doc1', 'doc2']);
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
   * @param     predicateOperation      An operator such as '=', '<>', '>', etc.
   * @param     predicateValues         An array of one or more search values.
   * @return                            Data requested from the collection.
   *
   * @example
   * ```javascript
   * const myData = await database.getAllWhere<'myClass'>('myCollection', 'myField', 'myOperator, ['mySearchValue1', mySearchValue2]);
   * ```
   */
  @server
  public async getAllWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: PredicateOperator,
    predicateValues: string[],
  ): Promise<T[]> {
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
   * Inserts a new document into a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Document name.
   * @param     documentBody        Document contents.
   * @return                        New document.
   *
   * @example
   * ```javascript
   * const myData = await database.set('myCollection', 'myDocument', 'Some contents for the document');
   * ```
   */
  @server
  public async set(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.SET}`,
      {
        collection,
        documentBody,
        documentName,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Replaces the contents of an existing document in a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Document name.
   * @param     documentBody        New contents.
   * @return                        Updated document.
   *
   * @example
   * ```javascript
   * const myData = await database.set('myCollection', 'myDocument', 'Some contents for the document');
   * ```
   */
  @server
  public async update(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.UPDATE}`,
      {
        collection,
        documentBody,
        documentName,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Appends contents to an existing document in a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Document name.
   * @param     documentBody        Appended contents.
   * @return                        Updated document.
   *
   * @example
   * ```javascript
   * const myData = await database.arrayPush('myCollection', 'myDocument', 'Contents appended to end of document');
   * ```
   */
  @server
  public async arrayPush(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.ARRAY_PUSH}`,
      {
        collection,
        documentBody,
        documentName,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Removes part of the contents from an existing document in a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Document name.
   * @param     documentBody        Removed contents.
   * @return                        Updated document.
   *
   * @example
   * ```javascript
   * const myData = await database.arrayPush('myCollection', 'myDocument', 'Contents to be removed from document');
   * ```
   */
  @server
  public async arrayRemove(collection: string, documentName: string, documentBody: any): Promise<boolean | void> {
    const { data } = await axios.post(
      `${this.rootPath}${DatabaseRoutes.ARRAY_REMOVE}`,
      {
        collection,
        documentBody,
        documentName,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   * Deletes a document from a collection.
   *
   * @param     collection          Name of the collection.
   * @param     documentName        Document name.
   * @return                        Deleted document.
   *
   * @example
   * ```javascript
   * const myData = await database.delete('myCollection', 'myDocument');
   * ```
   */
  @server
  public async delete(collection: string, documentName: string): Promise<boolean | void> {
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
