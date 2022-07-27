import { Account } from '../../model';

export function createAccount(id: string): Account {
  return new Account({
    id,
    // ftTransfers: [],
    // nftTransfers: [],
    // ownedTokens: [],
    // ownedCollections: [],
  });
}
