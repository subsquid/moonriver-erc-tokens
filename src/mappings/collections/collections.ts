import { Collection, ContractStandard, Account } from '../../model';
import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Context } from '../../processor';
import * as utils from '../utils';

export function createCollection({
  id,
  ctx,
  contractStandard,
  block,
  owner
}: {
  id: string;
  ctx: Context;
  contractStandard: ContractStandard;
  block: SubstrateBlock;
  owner: Account;
}): Collection {
  return new Collection({
    id,
    collectionType: contractStandard,
    currentOwner: owner,
    createdAtBlock: BigInt(block.height),
    createdAt: new Date(block.timestamp)
  });
}
