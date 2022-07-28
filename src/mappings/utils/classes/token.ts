import { Account, ContractStandard, FToken, NfToken } from '../../../model';
import { SubstrateBlock } from '@subsquid/substrate-processor';
import { createFToken, createNfToken } from '../../tokens';
import { BigNumber } from 'ethers';
import { getTokenEntityId } from '../common';
import { EntitiesManager } from './common';

/**
 * ::::::::::::: ERC20 TOKEN :::::::::::::
 */
export class FTokenManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    contractAddress,
    contractStandard,
    block
  }: {
    contractAddress: string;
    contractStandard: ContractStandard;
    block: SubstrateBlock;
  }): Promise<FToken> {
    if (!this.context) throw new Error('context is not defined');
    let token = this.entitiesMap.get(contractAddress);

    if (!token) {
      token = await this.context.store.get(FToken, contractAddress);
      if (!token || (token && (!token.name || !token.symbol))) {
        token = await createFToken({
          ctx: this.context,
          contractAddress,
          contractStandard,
          block
        });
      }
      this.add<FToken>(token);
    }

    return token;
  }
}

/**
 * ::::::::::::: ERC721/ERC1155 TOKEN :::::::::::::
 */
export class NfTokenManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    id,
    contractAddress,
    contractStandard,
    owner,
    block
  }: {
    id: BigNumber;
    contractAddress: string;
    contractStandard: ContractStandard;
    owner: Account;
    block: SubstrateBlock;
  }): Promise<NfToken> {
    if (!this.context) throw new Error('context is not defined');
    const tokenEntityId = getTokenEntityId(contractAddress, id.toString());
    let token = this.entitiesMap.get(tokenEntityId);

    if (!token) {
      token = await this.context.store.get(NfToken, {
        where: { id: tokenEntityId },
        relations: {
          currentOwner: true,
          collection: true
        }
      });
      if (!token || (token && (!token.name || !token.symbol))) {
        token = await createNfToken({
          id: tokenEntityId,
          nativeId: id,
          ctx: this.context,
          contractAddress,
          contractStandard,
          block,
          owner
        });
      }
      this.add<NfToken>(token);
    }

    return token;
  }
}
