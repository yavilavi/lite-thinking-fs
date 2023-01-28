import { Company } from "../../../entities/company.entity";

export interface GetCompanyByNITUseCase {
  execute(companyNIT: number): Promise<Company | null>;
}
