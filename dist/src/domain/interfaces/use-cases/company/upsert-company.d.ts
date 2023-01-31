import { Company } from "../../../entities/company.entity";
export interface UpsertCompanyUseCase {
    execute(company: Company): Promise<Company>;
}
//# sourceMappingURL=upsert-company.d.ts.map