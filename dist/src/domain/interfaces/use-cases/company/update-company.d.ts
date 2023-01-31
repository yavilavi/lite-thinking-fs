import { Company } from "../../../entities/company.entity";
import { UpdateResult } from "typeorm";
export interface UpdateCompanyUseCase {
    execute(company: Partial<Company>, NIT: string): Promise<UpdateResult | null>;
}
//# sourceMappingURL=update-company.d.ts.map