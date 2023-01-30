import { GetAllCompaniesUseCase } from "../../interfaces/use-cases/company/get-all-companies";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";


export class GetAllCompanies implements GetAllCompaniesUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(): Promise<Company[]> {
    return await this.companyRepository.find({ where: { isDeleted: false } });
  }
}
