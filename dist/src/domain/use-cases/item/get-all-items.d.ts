import { GetAllItemsUseCase } from "../../interfaces/use-cases/item/get-all-items";
import { DataSource, Repository } from "typeorm";
import { Item } from "../../entities/item.entity";
export declare class GetAllItems implements GetAllItemsUseCase {
    itemRepository: Repository<Item>;
    constructor(dataSource: DataSource);
    execute(): Promise<Item[]>;
}
//# sourceMappingURL=get-all-items.d.ts.map