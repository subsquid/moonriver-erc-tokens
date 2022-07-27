import { Contract as Erc721Contract } from '../../abi/erc721';
import { Context } from '../../processor';

export function getContractErc721({
  blockHeight,
  ctx,
  contractAddress
}: {
  blockHeight: number;
  ctx: Context;
  contractAddress: string;
}): Erc721Contract {
  return new Erc721Contract(
    { _chain: ctx._chain, block: { height: blockHeight } },
    contractAddress
  );
}
