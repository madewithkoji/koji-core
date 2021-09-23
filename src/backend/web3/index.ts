import { EthereumProvider } from './providers/ethereum';

/**
 * Provides interfaces for web3 dApps.
 */
export class Web3 {
  public providers = {
    ethereum: EthereumProvider,
  };
}
