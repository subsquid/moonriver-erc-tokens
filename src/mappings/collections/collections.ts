import { Collection, ContractStandard } from '../../model';
import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Context } from '../../processor';

export function createCollection({
  id,
  ctx,
  contractStandard,
  block
}: {
  id: string;
  ctx: Context;
  contractStandard: ContractStandard;
  block: SubstrateBlock;
}): Collection {
  return new Collection({
    id,
    collectionType: contractStandard,
    createdAtBlock: BigInt(block.height),
    createdAt: new Date(block.timestamp)
  });
}
