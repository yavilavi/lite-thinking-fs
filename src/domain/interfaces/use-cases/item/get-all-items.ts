import { Item } from "../../../entities/item.entity";

export interface GetAllItemsUseCase {
  execute(): Promise<Item[]>;
}
