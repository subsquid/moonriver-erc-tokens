import { EvmLogEvent, SubstrateBlock } from '@subsquid/substrate-processor';
import { BigNumber } from 'ethers';
import * as erc721 from '../../../abi/erc721';
import { ContractStandard, NftTransfer, TransferType } from '../../../model';
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

  await utils.entity.nftTransferManager.getOrCreate({
    amount: BigNumber.from('1'),
    tokenId,
    from,
    to,
    event,
    block,
    isBatch: false,
    contractStandard: ContractStandard.ERC721,
  });
  //
  // const fromAccount = await utils.entity.accountsManager.get(from);
  // const toAccount = await utils.entity.accountsManager.get(to);
  //
  // const transfer = new NftTransfer({
  //   id: event.id,
  //   blockNumber: BigInt(block.height),
  //   timestamp: new Date(block.timestamp),
  //   eventIndex: event.indexInBlock,
  //   txnHash: event.evmTxHash,
  //   from: fromAccount,
  //   to: toAccount,
  //   token: await utils.entity.nfTokenManager.get({
  //     id: tokenId,
  //     contractAddress: event.args.address,
  //     contractStandard: ContractStandard.ERC721,
  //     owner: toAccount,
  //     block
  //   }),
  //
  //   transferType: TransferType.TRANSFER,
  //   isBatch: false
  // });
  //
  // utils.entity.nftTransferManager.add<NftTransfer>(transfer);
}
