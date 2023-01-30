import express from 'express'
import { Request, Response } from 'express'
import { CreateCompanyUseCase } from "../../domain/interfaces/use-cases/company/create-company";
import { GetCompanyByNITUseCase } from "../../domain/interfaces/use-cases/company/get-company-by-NIT";
import { GetAllCompaniesUseCase } from "../../domain/interfaces/use-cases/company/get-all-companies";
import { DeleteCompanyUseCase } from "../../domain/interfaces/use-cases/company/delete-company";
import { UpdateCompanyUseCase } from "../../domain/interfaces/use-cases/company/update-company";
import { adminRequired } from "../../domain/middlewares";

export default function CompanyRouter(
  createCompanyUseCase: CreateCompanyUseCase,
  getCompanyByNITUseCase: GetCompanyByNITUseCase,
  getAllCompaniesUseCase: GetAllCompaniesUseCase,
  deleteCompanyUseCase: DeleteCompanyUseCase,
  updateCompanyUseCase: UpdateCompanyUseCase,
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
      const company = await getCompanyByNITUseCase.execute(req.params.NIT)
      res.statusCode = !company ? 404 : 200;
      res.json(!company ? { message: "Company not found" } : company);
    } catch (err) {
      res.status(404).send({ message: "Company not found" })
    }
  });

  router.get('/getAll', async (req: Request, res: Response) => {

    try {
      // @ts-ignore
      console.log("req.auth", req.auth);
      const companies = await getAllCompaniesUseCase.execute()
      res.statusCode = 200;
      res.json(companies);
    } catch (err) {
      res.status(500).send({ message: "Error fetching companies" })
    }
  });

  router.delete('/:NIT', adminRequired, async (req: Request, res: Response) => {
    try {
      const deleted = await deleteCompanyUseCase.execute(req.params.NIT)
      res.statusCode = !deleted || deleted?.affected === 0 ? 404 : 200;
      ;
      res.json(!deleted || deleted?.affected === 0 ? { message: "Company not found" } : deleted);
    } catch (err) {
      res.status(500).send({ message: "Error fetching companies" })
    }
  });

  router.put('/:NIT', adminRequired, async (req: Request, res: Response) => {
    try {
      const updated = await updateCompanyUseCase.execute(req.body, req.params.NIT);
      res.statusCode = !updated || updated?.affected === 0 ? 404 : 200;
      ;
      res.json(!updated || updated?.affected === 0 ? { message: "Company not found" } : updated);
    } catch (err) {
      res.status(500).send({ message: "Error updating company" })
    }
  });


  return router
};
