import axios from 'axios';
import { server } from '../../@decorators/server';
import { Base, BackendConfigurationInput } from '../../base';

/**
 * API routes for utilities.
 */
enum EthereumRoutes {
  ERC721_GET_BALANCE = '/v1/apps/hooks/web3/erc721/balanceOf',
  ERC1155_GET_BALANCE = '/v1/apps/hooks/web3/erc1155/balanceOf',
}

/**
 * Provides utility methods for improving the performance and functionality of your Koji app.
 */
export class EthereumProvider extends Base {
  private rootPath: string;
  private rootHeaders: Object;

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
  public constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get an account's balance for an ERC721 token.
   *
   * @param   contractId      The ID of the smart contract
   * @param   accountAddress  The address of the account to query
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
  public async getERC721Balance(contractId: string, accountAddress: string): Promise<number> {
    try {
      const { data } = await axios.post(
        `${this.rootPath}${EthereumRoutes.ERC721_GET_BALANCE}`,
        {
          contractId,
          accountAddress,
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
}
