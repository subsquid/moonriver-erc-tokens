import { Contract as Erc1155Contract } from '../../abi/erc1155';
import { Context } from '../../processor';

export function getContractErc1155({
  blockHeight,
  ctx,
  contractAddress
}: {
  blockHeight: number;
  ctx: Context;
  contractAddress: string;
}): Erc1155Contract {
  return new Erc1155Contract(
    { _chain: ctx._chain, block: { height: blockHeight } },
    contractAddress
  );
}
