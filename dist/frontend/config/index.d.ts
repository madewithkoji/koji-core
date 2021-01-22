import { KojiBridge } from '../kojiBridge';
export interface ServiceMap {
    [index: string]: any;
}
export declare class Config extends KojiBridge {
    serviceMap: ServiceMap;
    console: any;
    log(: any, process: any, env: any): any;
    constructor();
    load(): void;
}
export declare const config: Config;
