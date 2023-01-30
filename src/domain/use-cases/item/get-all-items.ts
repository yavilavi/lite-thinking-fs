import { GetAllItemsUseCase } from "../../interfaces/use-cases/item/get-all-items";
import { DataSource, Repository } from "typeorm";
import { Item } from "../../entities/item.entity";


export class GetAllItems implements GetAllItemsUseCase {
  itemRepository: Repository<Item>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item)
  }

  async execute(): Promise<Item[]> {
    const [ items ] = await this.itemRepository
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.company", "company")
      .where("company.isDeleted = :isDeleted", { isDeleted: false })
      .getManyAndCount();
    return items;
  }
}
