import { CreateCompanyUseCase } from "../../interfaces/use-cases/company/create-company";
import { DataSource, Repository } from "typeorm";
import { createCompanySchema } from "../../interfaces/validations/companyValidations";
import { Company } from "../../entities/company.entity";

export class CreateCompany implements CreateCompanyUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(company: Company): Promise<Company> {
    const valid = await createCompanySchema.isValid(company)
    if(valid) {
      const newCompany = this.companyRepository.create(company);
      newCompany.NIT = company.NIT;
      newCompany.name = company.name;
      newCompany.address = company.address;
      newCompany.phone = company.phone;
      return await this.companyRepository.save(company,)
    }
    throw new Error("Company data is not valid")
  }
}
