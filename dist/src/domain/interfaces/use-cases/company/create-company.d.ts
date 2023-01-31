import { Company } from "../../../entities/company.entity";
export interface CreateCompanyUseCase {
    execute(company: Company): Promise<Company>;
}
//# sourceMappingURL=create-company.d.ts.map