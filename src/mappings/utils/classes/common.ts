import {Context} from "../../../processor";

type EntityWithId = {
    id: string;
};

export class EntitiesManager {
    context: Context | null = null;

    entitiesMap = new Map();

    init<T>(ctx: Context) {
        this.context = ctx;
        this.entitiesMap = new Map() as Map<string, T>;
        return this;
    }

    add<T extends EntityWithId>(entity: T) {
        this.entitiesMap.set(entity.id, entity);
    }

    async saveAll() {
        if (!this.context) throw new Error('context is not defined');
        await this.context.store.save([...this.entitiesMap.values()]);
        this.entitiesMap.clear();
    }
}