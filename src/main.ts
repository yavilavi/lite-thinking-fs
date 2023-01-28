import "reflect-metadata"
import server from './server'
import { AppDataSource } from "./data/data-sources/typeORM/data-source";

// Routers
import UserRouter from './presentation/routers/user-router'
import ItemRouter from "./presentation/routers/item-router";
import CompanyRouter from "./presentation/routers/company-router";

//Use cases
import { UpsertUser } from './domain/use-cases/user/upsert-user'
import { GetUserById } from "./domain/use-cases/user/get-user-by-id";

import { UpsertItem } from "./domain/use-cases/item/upsert-item";
import { GetAllItems } from "./domain/use-cases/item/get-all-items";

import { UpsertCompany } from "./domain/use-cases/company/upsert-company";
import { GetCompanyByNIT } from "./domain/use-cases/company/get-company-by-NIT";
import { GetAllCompanies } from "./domain/use-cases/company/get-all-companies";
import { DeleteCompany } from "./domain/use-cases/company/delete-company";


const userMiddleWare = UserRouter(
  new UpsertUser(AppDataSource),
  new GetUserById(AppDataSource),
)

const itemMiddleware = ItemRouter(
  new UpsertItem(AppDataSource),
  new GetAllItems(AppDataSource),
)

const companyMiddleware = CompanyRouter(
  new UpsertCompany(AppDataSource),
  new GetCompanyByNIT(AppDataSource),
  new GetAllCompanies(AppDataSource),
  new DeleteCompany(AppDataSource)
)

// Routes
server.use("/user", userMiddleWare);
server.use("/item", itemMiddleware);
server.use("/company", companyMiddleware);

AppDataSource.initialize()
  .then(() => {
    server.listen(3001, () => console.log("Server running"));
  })
  .catch((error) => console.log(error))
