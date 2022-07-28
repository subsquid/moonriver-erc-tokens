import { EvmLogEvent, SubstrateBlock } from '@subsquid/substrate-processor';
import { BigNumber } from 'ethers';
import * as erc721 from '../../../abi/erc721';
import { ContractStandard, TransferDirection } from '../../../model';
import { Context } from '../../../processor';
import * as utils from '../../utils';

export async function handleErc721Transfer(
  ctx: Context,
  block: SubstrateBlock,
  event: EvmLogEvent
): Promise<void> {
  const { from, to, tokenId } = erc721.events[
    'Transfer(address,address,uint256)'
  ].decode(event.args);

  const transfer = await utils.entity.nftTransferManager.getOrCreate({
    amount: BigNumber.from('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    tokenId,
    from,
    to,
    event,
    block
  });

  await utils.entity.accountsNftTransferManager.getOrCreate({
    account: transfer.from,
    direction: TransferDirection.From,
    transfer
  });

  await utils.entity.accountsNftTransferManager.getOrCreate({
    account: transfer.to,
    direction: TransferDirection.To,
    transfer
  });
}
