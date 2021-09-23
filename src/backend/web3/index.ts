import { EthereumProvider } from './providers/ethereum';

/**
 * Provides interfaces for web3 dApps.
 */
export class Web3 {
  public providers = {
    ethereum: EthereumProvider,
  };
}

export const web3 = new Web3();
