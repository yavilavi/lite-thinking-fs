import { CreateCompanyUseCase } from "../../interfaces/use-cases/company/create-company";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class CreateCompany implements CreateCompanyUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(company: Company): Promise<Company>;
}
//# sourceMappingURL=create-company.d.ts.map