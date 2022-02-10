import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

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
 * Deprecated Web3 JSON-RPC request
 */
export interface DeprecatedJsonRpcRequest extends Web3Request {
  id: string | undefined;
  jsonrpc: '2.0';
}

/**
 * Deprecatd Web3 JSON-RPC response
 */
export interface DeprecatedJsonRpcResponse extends Web3RequestResult {
  id: string | undefined;
  jsonrpc: '2.0';
  method: string;
}

/**
 * Supported chains
 */
export type SupportedChain =
  | 'ethereum'
  | 'polygon'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'matic_mumbai';

/**
 * Native web3 provider that leverages Koji for multi-wallet support.
 */
export class EthereumProvider extends KojiBridge {
  /**
   * Gets whether or not the session is connect
   *
   * @return    Is connected
   *
   * @example
   * ```javascript
   * const isConnected = await Koji.web3.providers.ethereum.isConnected();
   * ```
   */
  @client
  public async isConnected(): Promise<boolean> {
    const {
      isConnected,
    } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/web3/ethereum/isConnected',
      data: {},
    }, 'KojiWeb3.Ethereum.IsConnected');

    return isConnected;
  }

  /**
   * Set the chain preferred by this app. For consumers using the Koji native
   * wallet, setting this automatically updates the user's connected chain. For
   * users of other wallets, Koji will notify the user if they are connected
   * using the non-preferred chain. If not set, defaults to ethereum mainnet.
   *
   * @param chain The chain preferred by this app
   *
   * @example
   * ```javascript
   * await Koji.web3.providers.ethereum.setPreferredChain('polygon');
   * ```
   */
  public async setPreferredChain(chain: SupportedChain): Promise<void> {
    await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/web3/ethereum/setPreferredChain',
      data: {
        chain,
      },
    }, 'KojiWeb3.Ethereum.SetPreferredChain');
  }

  /**
   * Proxies a request to an Ethereum wallet provider.
   *
   * @param   request       The request to proxy
   * @return                Request result
   *
   * @example
   * ```javascript
   * const accounts = await Koji.web3.providers.ethereum.request({ method: 'eth_requestAccounts' });
   * ```
   */
  @client
  public async request(args: Web3Request): Promise<Web3RequestResult> {
    const { result, error } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/web3/ethereum/request',
      data: {
        args,
      },
    }, 'KojiWeb3.Ethereum.RequestFinished');

    if (error) {
      throw new Error(error.message);
    }

    return result;
  }

  /**
   * Register an event listener for wallet events.
   *
   * @param   event             The name of the event for which to listen.
   * @param   callback          Called when the event is received
   *
   *
   * @example
   * ```javascript
   * Koji.web3.providers.ethereum.on('accountsChanged', ({ accounts }) => {
   *   console.log(accounts);
   * })
   * ```
   */
  @client
  public on(
    event: 'accountsChanged'|'chainChanged'|'connect'|'disconnect'|'message',
    callback: (message: any) => void,
  ): void {
    const scopedEventName = `KojiWeb3.Ethereum.Events.${event}`;
    this.registerMessageListener(scopedEventName, ({ eventData }) => {
      callback(eventData);
    });
  }

  /**
   * Support deprecated sendAsync method. This method is only implemented
   * because some assertion libraries check its existance when attaching to a
   * provider. It should not be used in cases where `request` is available.
   *
   * @param payload           JSON request payload
   * @param callback          Callback with request result
   */
  @client
  public async sendAsync(
    payload: DeprecatedJsonRpcRequest,
    callback: (error?: Error, response?: DeprecatedJsonRpcResponse) => unknown,
  ): Promise<void> {
    try {
      const result = await this.request(payload);
      callback(undefined, {
        id: payload.id,
        jsonrpc: '2.0',
        method: payload.method,
        result,
      });
    } catch (err: any) {
      callback(
        err,
        undefined,
      );
    }
  }
}

export const ethereumProvider = new EthereumProvider();
