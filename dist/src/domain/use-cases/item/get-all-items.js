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
exports.GetAllItems = void 0;
const item_entity_1 = require("../../entities/item.entity");
class GetAllItems {
    constructor(dataSource) {
        this.itemRepository = dataSource.getRepository(item_entity_1.Item);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const [items] = yield this.itemRepository
                .createQueryBuilder("item")
                .leftJoinAndSelect("item.company", "company")
                .where("company.isDeleted = :isDeleted", { isDeleted: false })
                .getManyAndCount();
            return items;
        });
    }
}
exports.GetAllItems = GetAllItems;
//# sourceMappingURL=get-all-items.js.map