"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertItem = void 0;
const item_entity_1 = require("../../entities/item.entity");
const company_entity_1 = require("../../entities/company.entity");
const ItemValidation_1 = require("../../interfaces/validations/ItemValidation");
class UpsertItem {
    constructor(dataSource) {
        this.itemRepository = dataSource.getRepository(item_entity_1.Item);
        this.companyRepository = dataSource.getRepository(company_entity_1.Company);
    }
    execute(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield ItemValidation_1.updateItemSchema.isValid(item);
            if (valid) {
                const newItem = new item_entity_1.Item();
                newItem.name = item.name;
                newItem.stock = item.stock;
                const company = yield this.companyRepository.findOne({ where: { NIT: item.companyNIT } });
                if (company) {
                    newItem.company = company;
                    return yield this.itemRepository.save(newItem);
                }
                else {
                    throw new Error("Company does not exists");
                }
            }
            throw new Error("Item data is not valid");
        });
    }
}
exports.UpsertItem = UpsertItem;
//# sourceMappingURL=upsert-item.js.map