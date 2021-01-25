export declare type Services = {
    [key: string]: string;
};
export declare class ServiceMap {
    services: Services;
    config(envMap?: Services): void;
}
export declare const serviceMap: ServiceMap;
