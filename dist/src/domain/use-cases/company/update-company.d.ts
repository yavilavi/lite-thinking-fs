import { UpdateCompanyUseCase } from "../../interfaces/use-cases/company/update-company";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class UpdateCompany implements UpdateCompanyUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(company: Partial<Company>, NIT: string): Promise<UpdateResult | null>;
}
//# sourceMappingURL=update-company.d.ts.map