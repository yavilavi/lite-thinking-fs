import { GetCompanyByNITUseCase } from "../../interfaces/use-cases/company/get-company-by-NIT";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";


export class GetCompanyByNIT implements GetCompanyByNITUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(companyNIT: string): Promise<Company | null> {
    return await this.companyRepository.findOne({ where: { NIT: companyNIT, isDeleted: false } })
  }
}
