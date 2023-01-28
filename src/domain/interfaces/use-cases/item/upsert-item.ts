import { Item } from "../../../entities/item.entity";

export interface UpsertItemUseCase {
  execute(item: Item): Promise<Item>;
}

