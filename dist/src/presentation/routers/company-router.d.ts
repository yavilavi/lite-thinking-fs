import { CreateCompanyUseCase } from "../../domain/interfaces/use-cases/company/create-company";
import { GetCompanyByNITUseCase } from "../../domain/interfaces/use-cases/company/get-company-by-NIT";
import { GetAllCompaniesUseCase } from "../../domain/interfaces/use-cases/company/get-all-companies";
import { DeleteCompanyUseCase } from "../../domain/interfaces/use-cases/company/delete-company";
import { UpdateCompanyUseCase } from "../../domain/interfaces/use-cases/company/update-company";
export default function CompanyRouter(createCompanyUseCase: CreateCompanyUseCase, getCompanyByNITUseCase: GetCompanyByNITUseCase, getAllCompaniesUseCase: GetAllCompaniesUseCase, deleteCompanyUseCase: DeleteCompanyUseCase, updateCompanyUseCase: UpdateCompanyUseCase): import("express-serve-static-core").Router;
//# sourceMappingURL=company-router.d.ts.map