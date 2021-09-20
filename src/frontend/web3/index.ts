import { ethereumProvider } from './providers/ethereum';

/**
 * Provides interfaces for web3 dApps.
 */
export class Web3 {
  public providers = {
    ethereum: ethereumProvider,
  };
}

export const web3 = new Web3();
