import { BigNumber } from 'ethers';
import {
  ContractStandard,
  NfToken,
  Account,
  TransferDirection
} from '../../model';
import { Context } from '../../processor';
import * as utils from '../utils';
import { EvmLogEvent, SubstrateBlock } from '@subsquid/substrate-processor';

import { getTokenDetails } from './utils';
import * as erc1155 from '../../abi/erc1155';

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

  const collection = await utils.entity.collectionManager.getOrCreate({
    id: contractAddress,
    contractStandard,
    block
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

export async function handleErc1155UriChanged(
  ctx: Context,
  block: SubstrateBlock,
  event: EvmLogEvent
): Promise<void> {
  const { id, value } = erc1155.events['URI(string,uint256)'].decode(
    event.args
  );

  const token = await utils.entity.nfTokenManager.get(NfToken, id.toString(), {
    currentOwner: true,
    collection: true
  });

  if (!token) throw new Error('Token is not existing.');
  console.log(
    `URI of token ${id.toString()} has been updated at block: ${block.height.toString()} | tx: ${
      event.evmTxHash
    }`
  );
  token.uri = value;
  utils.entity.nfTokenManager.add(token);
  throw new Error('DEBUG');
}
