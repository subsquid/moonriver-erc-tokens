import { BigNumber } from 'ethers';
import { ContractStandard, NfToken, Account } from '../../model';
import { Context } from '../../processor';
import * as utils from '../utils';
import { SubstrateBlock } from '@subsquid/substrate-processor';

import { getTokenDetails } from './utils';

export async function createNfToken({
  id,
  nativeId,
  contractAddress,
  contractStandard,
  owner,
  block,
  ctx
}: {
  id: string;
  nativeId: BigNumber;
  contractAddress: string;
  contractStandard: ContractStandard;
  owner: Account;
  block: SubstrateBlock;
  ctx: Context;
}): Promise<NfToken> {
  const { name, symbol, uri } = await getTokenDetails({
    tokenId: nativeId,
    contractAddress,
    contractStandard,
    blockHeight: block.height,
    ctx
  });

  const collection = await utils.entity.collectionManager.get({
    id: contractAddress,
    contractStandard,
    block,
    owner // TODO must be updated
  });

  return new NfToken({
    nativeId: nativeId.toString(),
    currentOwner: owner,
    id,
    name,
    symbol,
    uri,
    collection
  });
}
