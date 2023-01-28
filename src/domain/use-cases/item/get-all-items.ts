import { GetAllItemsUseCase } from "../../interfaces/use-cases/item/get-all-items";
import { DataSource, Repository } from "typeorm";
import { Item } from "../../entities/item.entity";


export class GetAllItems implements GetAllItemsUseCase {
  itemRepository: Repository<Item>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item)
  }

  async execute(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
}
