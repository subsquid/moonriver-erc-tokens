import { getTokenEntityId } from './common';
import {
  accountsManager,
  fTokenManager,
  nfTokenManager,
  ftTransferManager,
  nftTransferManager,
  collectionManager,
  saveAllEntities
} from './entityUtils';

export const entity = {
  accountsManager,
  fTokenManager,
  nfTokenManager,
  ftTransferManager,
  nftTransferManager,
  collectionManager,
  saveAllEntities
};
export const common = { getTokenEntityId };
