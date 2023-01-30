import { Company } from "../../../entities/company.entity";

export interface GetCompanyByNITUseCase {
  execute(companyNIT: string): Promise<Company | null>;
}
