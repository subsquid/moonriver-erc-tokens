import { Contract as Erc20Contract } from '../../abi/erc20';
import { Context } from '../../processor';

export function getContractErc20({
  blockHeight,
  ctx,
  contractAddress
}: {
  blockHeight: number;
  ctx: Context;
  contractAddress: string;
}): Erc20Contract {
  return new Erc20Contract(
    { _chain: ctx._chain, block: { height: blockHeight } },
    contractAddress
  );
}
