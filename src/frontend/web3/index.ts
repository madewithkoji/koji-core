import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

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
export class Web3Provider extends KojiBridge {
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
  public on(
    event: 'accountsChanged'|'chainChanged'|'connect'|'disconnect'|'message',
    callback: (...args: any) => void,
  ): void {
    const scopedEventName = `KojiWeb3.Ethereum.Events.${event}`;
    this.registerMessageListener(scopedEventName, ({ eventData }) => {
      console.log(eventData);
      callback(...eventData);
    });
  }
}

export const web3Provider = new Web3Provider();
