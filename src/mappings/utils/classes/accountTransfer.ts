import {
  Account,
  AccountFtTransfer,
  AccountNftTransfer,
  FtTransfer,
  NftTransfer,
  TransferDirection
} from '../../../model';
import { createAccount } from '../../accounts';
import { EntitiesManager } from './common';
import {
  createAccountFtTransfer,
  createAccountNftTransfer
} from '../../accountTransfer';

export class AccountsFtTransferManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    id = null,
    account,
    transfer,
    direction
  }: {
    id?: string | null;
    account: Account;
    transfer: FtTransfer;
    direction: TransferDirection;
  }): Promise<AccountFtTransfer> {
    if (!this.context) throw new Error('context is not defined');
    let accountTransfer = id ? this.entitiesMap.get(id) : null;

    if (!accountTransfer) {
      accountTransfer = id
        ? await this.context.store.get(AccountFtTransfer, id)
        : null;
      if (!accountTransfer) {
        accountTransfer = createAccountFtTransfer(account, transfer, direction);
      }
      this.add<AccountFtTransfer>(accountTransfer);
    }

    return accountTransfer;
  }
}

export class AccountsNftTransferManager extends EntitiesManager {
  constructor() {
    super();
  }

  async getOrCreate({
    id = null,
    account,
    transfer,
    direction
  }: {
    id?: string | null;
    account: Account;
    transfer: NftTransfer;
    direction: TransferDirection;
  }): Promise<AccountNftTransfer> {
    if (!this.context) throw new Error('context is not defined');
    let accountTransfer = id ? this.entitiesMap.get(id) : null;

    if (!accountTransfer) {
      accountTransfer = id
        ? await this.context.store.get(AccountNftTransfer, id)
        : null;
      if (!accountTransfer) {
        accountTransfer = createAccountNftTransfer(
          account,
          transfer,
          direction
        );
      }
      this.add<AccountNftTransfer>(accountTransfer);
    }

    return accountTransfer;
  }
}
