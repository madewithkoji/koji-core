import { Base, BackendConfigurationInput } from '../base';
export declare class Secret extends Base {
    private rootPath;
    private rootHeaders;
    constructor(config: BackendConfigurationInput);
    resolveValue<T>(keyPath: string): Promise<T>;
    generateSignedUrl(resource: string, expireSeconds?: number): Promise<string>;
}
