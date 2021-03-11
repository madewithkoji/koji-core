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
     * The auth token has expired or missing.
     * The auth token used in the request is invalid.
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
 * Implements a Koji database for the backend of your Koji. For more information, see [[https://developer.withkoji.com/docs/develop/koji-database | the Koji database developer guide]].
 */
export declare class Database extends Base {
    private rootPath;
    private rootHeaders;
    /**
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
     * const myData = await database.search<'myClass'>('myCollection', 'myField', 'mySearchValue');
     * ```
     */
    search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]>;
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
    getWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValue: string): Promise<T>;
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
    getAll<T>(collection: string, documentNames: string[]): Promise<T[]>;
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
    getAllWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValues: string[]): Promise<T[]>;
    /**
     * Inserts a new document into a collection.
     *
     * @param     collection          Name of the collection.
     * @param     documentName        Document name.
     * @param     documentBody        Document contents.
     * @param     returnDoc           Return the updated doc as a response.
     * @return                        An http status code (e.g., OK), or the updated document if returnDoc was specified as true.
     *
     * @example
     * ```javascript
     * const myData = await database.set('myCollection', 'myDocument', 'Some contents for the document');
     * ```
     */
    set(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
    /**
     * Replaces the contents of an existing document in a collection.
     *
     * @param     collection          Name of the collection.
     * @param     documentName        Document name.
     * @param     documentBody        New contents.
     * @param     returnDoc           Return the updated doc as a response.
     * @return                        An http status code (e.g., OK), or the updated document if returnDoc was specified as true.
     *
     * @example
     * ```javascript
     * const myData = await database.set('myCollection', 'myDocument', 'Some contents for the document');
     * ```
     */
    update(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
    /**
     * Appends contents to an existing document in a collection.
     *
     * @param     collection          Name of the collection.
     * @param     documentName        Document name.
     * @param     documentBody        Appended contents.
     * @param     returnDoc           Return the updated doc as a response.
     * @return                        An http status code (e.g., OK), or the updated document if returnDoc was specified as true.
     *
     * @example
     * ```javascript
     * const myData = await database.arrayPush('myCollection', 'myDocument', 'Contents appended to end of document');
     * ```
     */
    arrayPush(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
    /**
     * Removes part of the contents from an existing document in a collection.
     *
     * @param     collection          Name of the collection.
     * @param     documentName        Document name.
     * @param     documentBody        Removed contents.
     * @param     returnDoc           Return the updated doc as a response.
     * @return                        An http status code (e.g., OK), or the updated document if returnDoc was specified as true.
     *
     * @example
     * ```javascript
     * const myData = await database.arrayPush('myCollection', 'myDocument', 'Contents to be removed from document');
     * ```
     */
    arrayRemove(collection: string, documentName: string, documentBody: any, returnDoc?: boolean): Promise<DatabaseHttpStatusCode | any>;
    /**
     * Deletes a document from a collection.
     *
     * @param     collection          Name of the collection.
     * @param     documentName        Document name.
     * @return                        An http status code (e.g., OK).
     *
     * @example
     * ```javascript
     * const myData = await database.delete('myCollection', 'myDocument');
     * ```
     */
    delete(collection: string, documentName: string): Promise<DatabaseHttpStatusCode>;
}
export interface IDatabase extends Database {
}
