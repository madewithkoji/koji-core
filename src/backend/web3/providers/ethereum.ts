import axios from 'axios';

import { server } from '../../@decorators/server';
import { Base, BackendConfigurationInput } from '../../base';
import {
  SupportedChain,
  Web3Request,
  Web3RequestResult,
} from '../../../frontend/web3/providers/ethereum';

/**
 * API routes for utilities.
 */
enum EthereumRoutes {
  RPC_REQUEST = '/v1/apps/hooks/web3/eth/rpc/request',
  ERC721_GET_BALANCE = '/v1/apps/hooks/web3/erc721/balanceOf',
  ERC1155_GET_BALANCE = '/v1/apps/hooks/web3/erc1155/balanceOf',
  ERC1155_GET_BALANCE_BATCH = '/v1/apps/hooks/web3/erc1155/balanceOfBatch',
}

/**
 * Provides utility methods for improving the performance and functionality of your Koji app.
 */
export class EthereumProvider extends Base {
  private rootPath: string;
  private rootHeaders: Object;

  private readonly chain: SupportedChain;

  /**
   * Instantiates the Ethereum class.
   *
   * @param   config
   *
   * @example
   * ```javascript
   * const ethereum = new KojiBackend.web3.providers.ethereum({ res });
   * ```
   */
  public constructor(
    config: BackendConfigurationInput,
    chain: SupportedChain = 'ethereum',
  ) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };

    this.chain = chain;
  }

  /**
   * This method is sometimes used by frontend web3 libraries to determine if a
   * client is connected. We'll always be connected in the server context, so
   * we simply stub it out here.
   */
  @server
  public async isConnected(): Promise<boolean> {
    return true;
  }

  /**
   * Pass an RPC request through to the node.
   *
   * @param args A valid Ethereum RPC request
   */
  @server
  public async request(args: Web3Request): Promise<Web3RequestResult> {
    const { data } = await axios.post(
      `${this.rootPath}${EthereumRoutes.RPC_REQUEST}`,
      {
        network: this.chain,
        method: args.method,
        params: args.params,
      },
      {
        headers: this.rootHeaders,
      },
    );

    const { result, error } = data;

    if (error) {
      throw new Error(error.message);
    }

    return result;
  }

  /**
   * Get an account's balance for an ERC721 token.
   *
   * @param   contractId      The ID of the smart contract
   * @param   accountAddress  The address of the account to query
   * @param chain             Optional chain override. If not set, defaults to Ethereum
   *
   * @example
   * ```javascript
   * const balance = await ethereum.getERC721Balance(
   *    '0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb',
   *    '0x1702a1e7b9823e8e73efc19be25eea2712b9de22',
   * );
   * ```
   */
  @server
  public async getERC721Balance(
    contractId: string,
    accountAddress: string,
  ): Promise<number> {
    try {
      const { data } = await axios.post(
        `${this.rootPath}${EthereumRoutes.ERC721_GET_BALANCE}`,
        {
          contractId,
          accountAddress,
          chain: this.chain,
        },
        {
          headers: this.rootHeaders,
        },
      );
      return data.balance;
    } catch (err) {
      return 0;
    }
  }

  /**
   * Get an account's balance for an ERC1155 token.
   *
   * @param   contractId      The ID of the smart contract
   * @param   accountAddress  The address of the account to query
   * @param   tokenId         The ID of the specific token for which to return a balance
   * @param chain             Optional chain override. If not set, defaults to Ethereum
   *
   * @example
   * ```javascript
   * const balance = await ethereum.getERC1155Balance(
   *    '0x495f947276749ce646f68ac8c248420045cb7b5e',
   *    '0x1e093bacf9d51c7fad20badf049b2fb926003e73',
   *    '13585698947536714042189813736898920110951234445351156220539561948976043261953',
   * );
   * ```
   */
  @server
  public async getERC1155Balance(
    contractId: string,
    accountAddress: string,
    tokenId: string,
  ): Promise<number> {
    try {
      const { data } = await axios.post(
        `${this.rootPath}${EthereumRoutes.ERC1155_GET_BALANCE}`,
        {
          contractId,
          accountAddress,
          tokenId,
          chain: this.chain,
        },
        {
          headers: this.rootHeaders,
        },
      );
      return data.balance;
    } catch (err) {
      return 0;
    }
  }

  /**
   * Get an account's balance for multiple ERC1155 token IDs.
   *
   * @param contractId      The ID of the smart contract
   * @param accountAddress  The address of the account to query
   * @param tokenIds        An array of token IDs
   * @param chain           Optional chain override. If not set, defaults to Ethereum
   *
   * @example
   * ```javascript
   * const balances = await ethereum.getERC1155BalanceBatch(
   *    '0x495f947276749ce646f68ac8c248420045cb7b5e',
   *    '0x947e4b6e3c2383827fb1a1ace9b191f669089979',
   *    [
   *      '13585698947536714042189813736898920110951234445351156220539562030339903717377',
   *      '13585698947536714042189813736898920110951234445351156220539561952274578145281',
   *      '91545914907022949088754081908633048759965252325794344822483278837725871996929',
   *    ],
   * );
   * ```
   */
  @server
  public async getERC1155BalanceBatch(
    contractId: string,
    accountAddress: string,
    tokenIds: string[],
  ): Promise<{[tokenId: string]: number}> {
    try {
      const { data } = await axios.post(
        `${this.rootPath}${EthereumRoutes.ERC1155_GET_BALANCE_BATCH}`,
        {
          contractId,
          accountAddress,
          tokenIds,
          chain: this.chain,
        },
        {
          headers: this.rootHeaders,
        },
      );
      return data.balances;
    } catch (err) {
      return {};
    }
  }
}
