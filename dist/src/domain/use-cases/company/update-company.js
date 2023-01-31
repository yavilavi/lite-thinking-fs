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
exports.UpdateCompany = void 0;
const company_entity_1 = require("../../entities/company.entity");
const companyValidations_1 = require("../../interfaces/validations/companyValidations");
class UpdateCompany {
    constructor(dataSource) {
        this.companyRepository = dataSource.getRepository(company_entity_1.Company);
    }
    execute(company, NIT) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield companyValidations_1.updateCompanySchema.isValid(company);
            if (valid) {
                return yield this.companyRepository.update(NIT, Object.assign({}, company));
            }
            throw new Error("Company data is not valid");
        });
    }
}
exports.UpdateCompany = UpdateCompany;
//# sourceMappingURL=update-company.js.map