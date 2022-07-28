import { lookupArchive } from '@subsquid/archive-registry';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import {
  BatchContext,
  SubstrateBatchProcessor,
  BatchProcessorItem
} from '@subsquid/substrate-processor';
import * as erc20 from './abi/erc20';
import * as erc721 from './abi/erc721';
import * as erc1155 from './abi/erc1155';
import * as modules from './mappings';
import * as config from './config';
import * as utils from './mappings/utils';
import {
  Account,
  FToken,
  NfToken,
  FtTransfer,
  NftTransfer,
  Collection,
  AccountNftTransfer,
  AccountFtTransfer
} from './model';

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBatchSize(config.batchSize)
  .setDataSource({
    chain: config.chainNode,
    archive: lookupArchive('moonriver', { release: 'FireSquid' })
  })
  .setTypesBundle('moonriver')
  .addEvmLog('*', {
    filter: [
      [
        erc20.events['Transfer(address,address,uint256)'].topic,
        erc721.events['Transfer(address,address,uint256)'].topic,
        erc1155.events[
          'TransferBatch(address,address,address,uint256[],uint256[])'
        ].topic,
        erc1155.events[
          'TransferSingle(address,address,address,uint256,uint256)'
        ].topic
      ]
    ]
  });

type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

processor.run(database, async (ctx: Context) => {
  utils.entity.accountsManager.init<Account>(ctx);
  utils.entity.fTokenManager.init<FToken>(ctx);
  utils.entity.nfTokenManager.init<NfToken>(ctx);
  utils.entity.ftTransferManager.init<FtTransfer>(ctx);
  utils.entity.nftTransferManager.init<NftTransfer>(ctx);
  utils.entity.collectionManager.init<Collection>(ctx);
  utils.entity.accountsFtTransferManager.init<AccountFtTransfer>(ctx);
  utils.entity.accountsNftTransferManager.init<AccountNftTransfer>(ctx);

  for await (const block of ctx.blocks) {
    for await (const item of block.items) {
      if (item.name === 'EVM.Log') {
        switch (item.event.args.topics[0]) {
          case erc20.events['Transfer(address,address,uint256)'].topic:
          case erc721.events['Transfer(address,address,uint256)'].topic:
            try {
              await modules.handleErc20Transfer(ctx, block.header, item.event);
            } catch (e) {
              try {
                await modules.handleErc721Transfer(
                  ctx,
                  block.header,
                  item.event
                );
              } catch (error) {
                // console.log(error);
              }
            }
            break;
          case erc1155.events[
            'TransferBatch(address,address,address,uint256[],uint256[])'
          ].topic:
            await modules.handleErc1155TransferBatch(
              ctx,
              block.header,
              item.event
            );
            break;
          case erc1155.events[
            'TransferSingle(address,address,address,uint256,uint256)'
          ].topic:
            await modules.handleErc1155TransferSingle(
              ctx,
              block.header,
              item.event
            );
            break;
          default:
        }
      }
    }
  }

  await utils.entity.saveAllEntities();
});
