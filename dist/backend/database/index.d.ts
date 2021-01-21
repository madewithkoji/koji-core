import { Base, BackendConfigurationInput } from '../base';
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
export declare class Database extends Base {
    private rootPath;
    private rootHeaders;
    constructor(config: BackendConfigurationInput);
    get<T>(collection: string, documentName?: string | null): Promise<T>;
    getCollections(): Promise<string[]>;
    search<T>(collection: string, queryKey: string, queryValue: string): Promise<T[]>;
    getWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValue: string): Promise<T>;
    getAll<T>(collection: string, documentNames: string[]): Promise<T[]>;
    getAllWhere<T>(collection: string, predicateKey: string, predicateOperation: PredicateOperator, predicateValues: string[]): Promise<T[]>;
    set(collection: string, documentName: string, documentBody: any): Promise<boolean>;
    update(collection: string, documentName: string, documentBody: any): Promise<boolean | void>;
    arrayPush(collection: string, documentName: string, documentBody: any): Promise<boolean | void>;
    arrayRemove(collection: string, documentName: string, documentBody: any): Promise<boolean | void>;
    delete(collection: string, documentName: string): Promise<boolean | void>;
}
export interface IDatabase extends Database {
}
