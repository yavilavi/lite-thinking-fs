import { UpsertItemUseCase } from "../../interfaces/use-cases/item/upsert-item";
import { DataSource, Repository } from "typeorm";
import { Item } from "../../entities/item.entity";
import { Company } from "../../entities/company.entity";


export class UpsertItem implements UpsertItemUseCase {
  itemRepository: Repository<Item>
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item)
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(item: Item): Promise<Item> {
    const newItem = new Item();
    newItem.name = item.name;
    newItem.stock = item.stock;
    const company = await this.companyRepository.findOne({ where: { NIT: item.companyNIT } });
    if (company) {
      newItem.company = company
      return await this.itemRepository.save(newItem);
    } else {
      throw new Error("Company does not exists");
    }
  }
}
