import { UpdateCompanyUseCase } from "../../interfaces/use-cases/company/update-company";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { Company } from "../../entities/company.entity";
import { updateCompanySchema } from "../../interfaces/validations/companyValidations";

export class UpdateCompany implements UpdateCompanyUseCase {
  companyRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.companyRepository = dataSource.getRepository(Company)
  }

  async execute(company: Partial<Company>, NIT: string): Promise<UpdateResult | null> {
    const valid = await updateCompanySchema.isValid(company);
    if (valid) {
      return await this.companyRepository.update(NIT, { ...company });
    }
    throw new Error("Company data is not valid")
  }
}
