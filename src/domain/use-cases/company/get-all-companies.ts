import { GetAllCompaniesUseCase } from "../../interfaces/use-cases/company/get-all-companies";
import { DataSource, Repository } from "typeorm";
import { Company } from "../../entities/company.entity";


export class GetAllCompanies implements GetAllCompaniesUseCase {
  itemRepository: Repository<Company>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Company)
  }

  async execute(): Promise<Company[]> {
    return await this.itemRepository.find({ where: { isDeleted: false } });
  }
}
