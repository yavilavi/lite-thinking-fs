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
exports.UpsertCompany = void 0;
const company_entity_1 = require("../../entities/company.entity");
class UpsertCompany {
    constructor(dataSource) {
        this.companyRepository = dataSource.getRepository(company_entity_1.Company);
    }
    execute(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCompany = this.companyRepository.create(company);
            newCompany.NIT = company.NIT;
            newCompany.name = company.name;
            newCompany.address = company.address;
            newCompany.phone = company.phone;
            return yield this.companyRepository.save(company);
        });
    }
}
exports.UpsertCompany = UpsertCompany;
//# sourceMappingURL=upsert-company.js.map