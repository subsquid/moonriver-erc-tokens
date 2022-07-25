import { EvmLogEvent, SubstrateBlock } from '@subsquid/substrate-processor';
import * as erc1155 from '../abi/erc1155';
import { handleTransfer } from './transfer';
import { ContractStandard } from '../model';
import { Context } from '../processor';

export async function handleErc1155TransferBatch(
  ctx: Context,
  block: SubstrateBlock,
  event: EvmLogEvent
): Promise<void> {
  const { operator, from, to, ids, values } = erc1155.events[
    'TransferBatch(address,address,address,uint256[],uint256[])'
  ].decode(event.args);

  // console.log('===========================================================')
  // console.log('handleErc1155TransferBatch');
  // console.log(operator, from, to, ids, values);

  // await handleTransfer({
  //   contractStandard: ContractStandard.ERC721,
  //   tokenId: tokenId.toString(),
  //   event,
  //   ctx,
  //   block,
  //   from,
  //   to
  // });
}

export async function handleErc1155TransferSingle(
  ctx: Context,
  block: SubstrateBlock,
  event: EvmLogEvent
): Promise<void> {
  const { operator, from, to, id, value } = erc1155.events[
    'TransferSingle(address,address,address,uint256,uint256)'
  ].decode(event.args);

  console.log('===========================================================');
  console.log(block.height);
  console.log(event.evmTxHash);
  console.log(event.args);
  console.log('handleErc1155TransferSingle');
  console.log(operator, from, to, id.toString(), value.toString());

  await handleTransfer({
    contractStandard: ContractStandard.ERC1155,
    tokenId: id.toString(),
    tokenIdBn: id,
    operator,
    value,
    event,
    ctx,
    block,
    from,
    to
  });
}
