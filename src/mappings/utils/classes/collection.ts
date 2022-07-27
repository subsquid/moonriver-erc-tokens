import { Account, Collection, ContractStandard } from '../../../model';
import { SubstrateBlock } from '@subsquid/substrate-processor';
import { createCollection } from '../../collections';
import { EntitiesManager } from './common';

/**
 * ::::::::::::: ERC721/ERC1155 TOKEN COLLECTION :::::::::::::
 */
export class CollectionManager extends EntitiesManager {
  constructor() {
    super();
  }

  async get({
    id,
    contractStandard,
    block,
    owner
  }: {
    id: string;
    contractStandard: ContractStandard;
    block: SubstrateBlock;
    owner: Account;
  }): Promise<Collection> {
    if (!this.context) throw new Error('context is not defined');

    let collection = this.entitiesMap.get(id);

    if (!collection) {
      collection = await this.context.store.get(Collection, {
        where: { id },
        relations: { currentOwner: true }
      });
      if (!collection) {
        collection = createCollection({
          id,
          ctx: this.context,
          contractStandard,
          block,
          owner
        });
      }
      this.add<Collection>(collection);
    }

    return collection;
  }
}
