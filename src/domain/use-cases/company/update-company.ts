import { UpdateCompanyUseCase } from "../../interfaces/use-cases/company/update-company";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { Company } from "../../entities/company.entity";

export class UpdateCompany implements UpdateCompanyUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(company: Partial<Company>, NIT: string): Promise<UpdateResult | null> {
    return await this.companyRepository.update(NIT, { ...company });

  }
}
