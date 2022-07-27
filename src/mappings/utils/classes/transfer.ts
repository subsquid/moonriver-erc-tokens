import { BigNumber } from 'ethers';
import { EvmLogEvent, SubstrateBlock } from '@subsquid/substrate-processor';
import {
  ContractStandard,
  FtTransfer,
  NftTransfer,
  TransferType
} from '../../../model';
import { accountsManager, fTokenManager, nfTokenManager } from '../entityUtils';
import { EntitiesManager } from './common';

/**
 * ::::::::::::: TRANSFERS ERC20 TOKEN :::::::::::::
 */
export class FtTransferManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    from,
    to,
    amount,
    event,
    block
  }: {
    from: string;
    to: string;
    amount: BigNumber;
    event: EvmLogEvent;
    block: SubstrateBlock;
  }): Promise<FtTransfer> {
    const fromAccount = await accountsManager.get(from);
    const toAccount = await accountsManager.get(to);

    const transfer = new FtTransfer({
      id: event.id,
      blockNumber: BigInt(block.height),
      timestamp: new Date(block.timestamp),
      eventIndex: event.indexInBlock,
      txnHash: event.evmTxHash,
      from: fromAccount,
      to: toAccount,
      token: await fTokenManager.get({
        contractAddress: event.args.address,
        contractStandard: ContractStandard.ERC20,
        block
      }),
      amount: BigInt(amount.toString()),
      transferType: TransferType.TRANSFER
    });

    this.add<FtTransfer>(transfer);

    return transfer;
  }
}
/**
 * ::::::::::::: TRANSFERS ERC721/ERC1155 TOKEN :::::::::::::
 */
export class NftTransferManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    from,
    to,
    amount,
    tokenId,
    event,
    block,
    isBatch,
    contractStandard
  }: {
    from: string;
    to: string;
    amount: BigNumber;
    tokenId: BigNumber;
    event: EvmLogEvent;
    block: SubstrateBlock;
    isBatch: boolean;
    contractStandard: ContractStandard;
  }): Promise<NftTransfer> {
    const fromAccount = await accountsManager.get(from);
    const toAccount = await accountsManager.get(to);

    const transfer = new NftTransfer({
      id: event.id,
      blockNumber: BigInt(block.height),
      timestamp: new Date(block.timestamp),
      eventIndex: event.indexInBlock,
      txnHash: event.evmTxHash,
      from: fromAccount,
      to: toAccount,
      token: await nfTokenManager.get({
        id: tokenId,
        contractAddress: event.args.address,
        owner: toAccount,
        contractStandard,
        block
      }),
      amount: BigInt(amount.toString()),
      transferType: TransferType.TRANSFER,
      isBatch
    });

    this.add<NftTransfer>(transfer);

    return transfer;
  }
}
