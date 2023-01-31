import { GetCompanyByNITUseCase } from "../../interfaces/use-cases/company/get-company-by-NIT";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";
export declare class GetCompanyByNIT implements GetCompanyByNITUseCase {
    companyRepository: Repository<Company>;
    constructor(dataSource: DataSource);
    execute(companyNIT: string): Promise<Company | null>;
}
//# sourceMappingURL=get-company-by-NIT.d.ts.map