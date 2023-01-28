import { DeleteResult } from "typeorm";

export interface DeleteCompanyUseCase {
  execute(companyNIT: number): Promise<DeleteResult | null>;
}
