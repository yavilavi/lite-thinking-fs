import { Company } from "../../../entities/company.entity";

export interface GetAllCompaniesUseCase {
  execute(): Promise<Company[]>;
}
