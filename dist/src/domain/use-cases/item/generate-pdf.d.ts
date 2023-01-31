import { DataSource, Repository } from "typeorm";
import { GenerateStockPDFUseCase } from "../../interfaces/use-cases/item/generate-stock-pdf";
import { Item } from "../../entities/item.entity";
export declare class GenerateStockPDF implements GenerateStockPDFUseCase {
    itemRepository: Repository<Item>;
    constructor(dataSource: DataSource);
    execute(recipientEmail: string): Promise<{
        status: string;
        fileUrl: string;
    }>;
}
//# sourceMappingURL=generate-pdf.d.ts.map