import { Context } from '../../../processor';

type EntityWithId = {
  id: string;
};

export class EntitiesManager {
  context: Context | null = null;

  entitiesMap = new Map();

  init(ctx: Context) {
    this.context = ctx;
    this.entitiesMap = new Map();
    return this;
  }

  add<T extends EntityWithId>(entity: T): void {
    this.entitiesMap.set(entity.id, entity);
  }

  async saveAll(): Promise<void> {
    if (!this.context) throw new Error('context is not defined');
    await this.context.store.save([...this.entitiesMap.values()]);
    this.entitiesMap.clear();
  }
}
