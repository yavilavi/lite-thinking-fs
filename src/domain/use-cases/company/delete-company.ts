import { DeleteCompanyUseCase } from "../../interfaces/use-cases/company/delete-company";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";


export class DeleteCompany implements DeleteCompanyUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(companyNIT: string): Promise<DeleteResult | null> {
    return await this.companyRepository.update(companyNIT, { isDeleted: true })
  }
}
