import * as entityManagerClasses from './classes';

export async function saveAllEntities(): Promise<void> {
  await accountsManager.saveAll();
  await collectionManager.saveAll();
  await fTokenManager.saveAll();
  await nfTokenManager.saveAll();
  await ftTransferManager.saveAll();
  await nftTransferManager.saveAll();
}

export const accountsManager = new entityManagerClasses.AccountsManager();
export const fTokenManager = new entityManagerClasses.FTokenManager();
export const nfTokenManager = new entityManagerClasses.NfTokenManager();
export const ftTransferManager = new entityManagerClasses.FtTransferManager();
export const nftTransferManager = new entityManagerClasses.NftTransferManager();
export const collectionManager = new entityManagerClasses.CollectionManager();
