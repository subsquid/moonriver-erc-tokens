import {Account} from "../../../model";
import {createAccount} from "../../accounts";
import { EntitiesManager } from './common';

export class AccountsManager extends EntitiesManager {
    constructor() {
        super();
    }

    async get(id: string): Promise<Account> {
        if (!this.context) throw new Error('context is not defined');
        let account = this.entitiesMap.get(id);

        if (!account) {
            account = await this.context.store.get(Account, id);
            if (!account) {
                account = createAccount(id);
            }
            this.add<Account>(account);
        }

        return account;
    }
}