import { Company } from "../../../entities/company.entity";
export interface GetCompanyByNITUseCase {
    execute(companyNIT: string): Promise<Company | null>;
}
//# sourceMappingURL=get-company-by-NIT.d.ts.map