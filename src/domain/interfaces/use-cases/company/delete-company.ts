import { DeleteResult } from "typeorm";

export interface DeleteCompanyUseCase {
  execute(companyNIT: string): Promise<DeleteResult | null>;
}
