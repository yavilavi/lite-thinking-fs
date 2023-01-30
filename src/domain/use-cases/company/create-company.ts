import { CreateCompanyUseCase } from "../../interfaces/use-cases/company/create-company";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";

export class CreateCompany implements CreateCompanyUseCase {
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
