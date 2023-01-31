import { GetAllCompaniesUseCase } from "../../interfaces/use-cases/company/get-all-companies";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class GetAllCompanies implements GetAllCompaniesUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(): Promise<Company[]>;
}
//# sourceMappingURL=get-all-companies.d.ts.map