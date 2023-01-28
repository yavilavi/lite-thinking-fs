import { UpsertCompanyUseCase } from "../../interfaces/use-cases/company/upsert-company";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";

export class UpsertCompany implements UpsertCompanyUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(company: Company): Promise<Company> {
    const newCompany = this.companyRepository.create(company);
    newCompany.NIT = company.NIT;
    newCompany.name = company.name;
    newCompany.address = company.address;
    newCompany.phone = company.phone;
    return await this.companyRepository.save(company,)

  }
}
