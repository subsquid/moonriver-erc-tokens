import { ContractStandard, FToken } from '../../model';
import { Context } from '../../processor';
import { getTokenDetails } from './utils';
import { SubstrateBlock } from '@subsquid/substrate-processor';

export async function createFToken({
  contractAddress,
  contractStandard,
  block,
  ctx
}: {
  contractAddress: string;
  contractStandard: ContractStandard;
  block: SubstrateBlock;
  ctx: Context;
}): Promise<FToken> {
  const { name, symbol, decimals } = await getTokenDetails({
    contractAddress,
    contractStandard,
    blockHeight: block.height,
    ctx
  });

  return new FToken({
    id: contractAddress,
    name,
    symbol,
    decimals
  });
}
