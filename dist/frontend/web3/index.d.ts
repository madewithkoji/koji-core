/**
 * Provides interfaces for web3 dApps.
 */
export declare class Web3 {
    providers: {
        ethereum: import("./providers/ethereum").EthereumProvider;
    };
}
export declare const web3: Web3;
