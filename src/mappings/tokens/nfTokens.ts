import { BigNumber } from 'ethers';
import {
  ContractStandard,
  NfToken,
  Account,
} from '../../model';
import { Context } from '../../processor';
import * as utils from '../utils';

import { getTokenDetails } from './utils';
import * as erc1155 from '../../abi/erc1155';

export async function createNfToken({
  id,
  nativeId,
  contractAddress,
  contractStandard,
  owner,
  ctx
}: {
  id: string;
  nativeId: BigNumber;
  contractAddress: string;
  contractStandard: ContractStandard;
  owner: Account;
  ctx: Context;
}): Promise<NfToken> {
  const { name, symbol, uri } = await getTokenDetails({
    tokenId: nativeId,
    contractAddress,
    contractStandard,
    ctx
  });

  const collection = await utils.entity.collectionManager.getOrCreate({
    id: contractAddress,
    contractStandard,
  });

  return new NfToken({
    nativeId: nativeId.toString(),
    currentOwner: owner,
    isBurned: false,
    amount: BigInt(0),
    id,
    name,
    symbol,
    uri,
    collection
  });
}

export async function handleErc1155UriChanged(): Promise<void> {
  const block = utils.common.blockContextManager.getCurrentBlock();
  const event = utils.common.blockContextManager.getCurrentEvent();

  console.log('-----------handleErc1155UriChanged');
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

  await utils.entity.uriUpdateActionsManager.getOrCreate(
    event.evmTxHash,
    token,
    value
  );

  utils.entity.nfTokenManager.add(token);
  throw new Error('DEBUG');
}
