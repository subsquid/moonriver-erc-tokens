import { Account, Collection, ContractStandard } from '../../../model';
import { SubstrateBlock } from '@subsquid/substrate-processor';
import { createCollection } from '../../collections';
import { EntitiesManager } from './common';

/**
 * ::::::::::::: ERC721/ERC1155 TOKEN COLLECTION :::::::::::::
 */
export class CollectionManager extends EntitiesManager<Collection> {
  async getOrCreate({
    id,
    contractStandard,
  }: {
    id: string;
    contractStandard: ContractStandard;
  }): Promise<Collection> {
    if (!this.context) throw new Error('context is not defined');

    let collection = this.entitiesMap.get(id);

    if (!collection) {
      collection = await this.context.store.get(Collection, {
        where: { id }
      });
      if (!collection) {
        collection = createCollection({
          id,
          contractStandard,
        });
      }
      this.add(collection);
    }

    return collection;
  }
}
