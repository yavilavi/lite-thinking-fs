import { DeleteCompanyUseCase } from "../../interfaces/use-cases/company/delete-company";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class DeleteCompany implements DeleteCompanyUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(companyNIT: string): Promise<DeleteResult | null>;
}
//# sourceMappingURL=delete-company.d.ts.map