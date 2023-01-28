import express from 'express'
import { Request, Response } from 'express'
import { UpsertCompanyUseCase } from "../../domain/interfaces/use-cases/company/upsert-company";
import { GetCompanyByNITUseCase } from "../../domain/interfaces/use-cases/company/get-company-by-NIT";
import { GetAllCompaniesUseCase } from "../../domain/interfaces/use-cases/company/get-all-companies";
import { DeleteCompanyUseCase } from "../../domain/interfaces/use-cases/company/delete-company";
import { adminRequired } from "../../domain/middlewares";

export default function CompanyRouter(
  createCompanyUseCase: UpsertCompanyUseCase,
  getCompanyByNITUseCase: GetCompanyByNITUseCase,
  getAllCompaniesUseCase: GetAllCompaniesUseCase,
  deleteCompanyUseCase: DeleteCompanyUseCase,
) {
  const router = express.Router();

  router.post('/', adminRequired, async (req: Request, res: Response) => {
    try {
      const company = await createCompanyUseCase.execute(req.body)
      res.statusCode = 201
      res.json(company)
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error saving data" })
    }
  });

  router.get('/getByNIT/:NIT', async (req: Request, res: Response) => {
    try {
      const company = await getCompanyByNITUseCase.execute(Number(req.params.NIT))
      res.statusCode = !company ? 404 : 200;
      res.json(!company ? { message: "Company not found" } : company);
    } catch (err) {
      res.status(404).send({ message: "Company not found" })
    }
  });

  router.get('/getAll', async (req: Request, res: Response) => {
    try {
      const companies = await getAllCompaniesUseCase.execute()
      res.statusCode = 200;
      res.json(companies);
    } catch (err) {
      res.status(500).send({ message: "Error fetching companies" })
    }
  });

  router.delete('/:NIT', adminRequired, async (req: Request, res: Response) => {
    try {
      const deleted = await deleteCompanyUseCase.execute(Number(req.params.NIT))
      res.statusCode = !deleted || deleted?.affected ===0 ? 404 : 200;
      ;
      res.json(!deleted || deleted?.affected ===0 ? { message: "Company not found" } : deleted);
    } catch (err) {
      res.status(500).send({ message: "Error fetching companies" })
    }
  });


  return router
};
