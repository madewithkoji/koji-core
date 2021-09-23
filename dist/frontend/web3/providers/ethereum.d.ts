import { KojiBridge } from '../../kojiBridge';
/**
 * A web3 request to proxy
 */
export interface Web3Request {
    method: string;
    params?: any[];
}
/**
 * Result of a proxied web3 request
 */
export interface Web3RequestResult {
    result: unknown;
    error?: {
        code: number;
        message: string;
    };
}
/**
 * Manages authentication and authorization on the frontend of your Koji app.
 */
export declare class EthereumProvider extends KojiBridge {
    /**
     * Gets whether or not the session is connect
     *
     * @return    Is connected
     *
     * @example
     * ```javascript
     * const isConnected = await Koji.web3.isConnected();
     * ```
     */
    isConnected(): Promise<boolean>;
    /**
     * Proxies a request to an Ethereum wallet provider.
     *
     * @param   request       The request to proxy
     * @return                Request result
     *
     * @example
     * ```javascript
     * const accounts = await Koji.web3.request({ method: 'eth_requestAccounts' });
     * ```
     */
    request(args: Web3Request): Promise<Web3RequestResult>;
    /**
     * Register an event listener for wallet events
     *
     * @param   event             The name of the event for which to listen.
     * @param   callback          Called when the event is received
     *
     *
     * @example
     * ```javascript
     * Koji.web3.on('accountsChanged', ({ accounts }) => {
     *   console.log(accounts);
     * })
     * ```
     */
    on(event: 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect' | 'message', callback: (message: any) => void): void;
}
export declare const ethereumProvider: EthereumProvider;
