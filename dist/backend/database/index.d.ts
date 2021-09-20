import { Base, BackendConfigurationInput } from '../base';
/**
 * API routes for database methods.
 */
export declare enum DatabaseRoutes {
    ARRAY_PUSH = "/v1/store/update/push",
    ARRAY_REMOVE = "/v1/store/update/remove",
    DELETE = "/v1/store/delete",
    GET = "/v1/store/get",
    GET_ALL = "/v1/store/getAll",
    GET_ALL_WHERE = "/v1/store/getAllWhere",
    GET_COLLECTIONS = "/v1/store/getCollections",
    SEARCH = "/v1/store/search",
    SET = "/v1/store/set",
    UPDATE = "/v1/store/update"
}
/**
 * Available operator types for database comparisons.
 */
export declare enum PredicateOperator {
    LESS_THAN = "<",
    LESS_THAN_OR_EQUAL_TO = "<=",
    EQUAL_TO = "==",
    GREATER_THAN = ">",
    GREATER_THAN_OR_EQUAL_TO = ">=",
    NOT_EQUAL_TO = "!=",
    ARRAY_CONTAINS = "array-contains",
    ARRAY_CONTAINS_ANY = "array-contains-any",
    IN = "in",
    NOT_IN = "not-in"
}
/**
 * Possible response values when interacting with the database API.
 */
export declare enum DatabaseHttpStatusCode {
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
    SERVICE_UNAVAILABLE = 503
}
/**
 * Implements a Koji database for the backend of your Koji app.
 *
 * A Koji database is included with each Koji project and stores key-value pairs.
 * For more information, see the {@doclink koji-database | Koji database developer guide}.
 */
export declare class Database extends Base {
    private rootPath;
    private rootHeaders;
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
    constructor(config: BackendConfigurationInput);
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
    get<T>(collection: string, documentName?: string | null): Promise<T>;
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
    getCollections(): Promise<string[]>;
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
    search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]>;
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
    getWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValue: string): Promise<T>;
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
    getAll<T>(collection: string, documentNames: string[]): Promise<T[]>;
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
    getAllWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValues: string[]): Promise<T[]>;
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
    set(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
    /**
     * Updates the specified data for an entry in the database collection.
     *
     * NOTE: This method updates only the values that are specified in `documentBody`. If other values exist in the entry, they are not changed.
     * If no existing entry matches the `documentName`, a new entry is created with the specified `documentName` and `documentBody`.
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
    update(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
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
    arrayPush(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
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
    arrayRemove(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
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
    delete(collection: string, documentName: string): Promise<DatabaseHttpStatusCode>;
}
export interface IDatabase extends Database {
}
