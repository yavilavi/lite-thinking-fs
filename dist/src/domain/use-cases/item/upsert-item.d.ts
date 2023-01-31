import { UpsertItemUseCase } from "../../interfaces/use-cases/item/upsert-item";
import { DataSource, Repository } from "typeorm";
import { Item } from "../../entities/item.entity";
import { Company } from "../../entities/company.entity";
export declare class UpsertItem implements UpsertItemUseCase {
    itemRepository: Repository<Item>;
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(item: Item): Promise<Item>;
}
//# sourceMappingURL=upsert-item.d.ts.map