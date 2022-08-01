import { Context } from '../../../processor';

type EntityWithId = {
  id: string;
};

export class EntitiesManager<T extends EntityWithId> {
  context: Context | null = null;

  entitiesMap: Map<string, T> = new Map();

  init(ctx: Context) {
    this.context = ctx;
    return this;
  }

  add(entity: T): void {
    this.entitiesMap.set(entity.id, entity);
  }

  async saveAll(): Promise<void> {
    if (!this.context) throw new Error('context is not defined');
    await this.context.store.save([...this.entitiesMap.values()]);
    this.entitiesMap.clear();
  }
}
