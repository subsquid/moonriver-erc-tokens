import { getTokenEntityId } from './common';
import {
  accountsManager,
  fTokenManager,
  nfTokenManager,
  ftTransferManager,
  nftTransferManager,
  collectionManager,
  accountsFtTransferManager,
  accountsNftTransferManager,
  saveAllEntities
} from './entityUtils';

export const entity = {
  accountsManager,
  fTokenManager,
  nfTokenManager,
  ftTransferManager,
  nftTransferManager,
  collectionManager,
  accountsFtTransferManager,
  accountsNftTransferManager,
  saveAllEntities
};
export const common = { getTokenEntityId };
