import { UpsertItemUseCase } from "../../domain/interfaces/use-cases/item/upsert-item";
import { GetAllItemsUseCase } from "../../domain/interfaces/use-cases/item/get-all-items";
import { GenerateStockPDFUseCase } from "../../domain/interfaces/use-cases/item/generate-stock-pdf";
export default function ItemRouter(upsertItemUseCase: UpsertItemUseCase, getAllItemsUseCase: GetAllItemsUseCase, generateStockPDFUseCase: GenerateStockPDFUseCase): import("express-serve-static-core").Router;
//# sourceMappingURL=item-router.d.ts.map