import { UpsertCompanyUseCase } from "../../interfaces/use-cases/company/upsert-company";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class UpsertCompany implements UpsertCompanyUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(company: Company): Promise<Company>;
}
//# sourceMappingURL=upsert-company.d.ts.map