import "reflect-metadata"
import server from './server'
import { AppDataSource } from "./data/data-sources/typeORM/data-source";
import cors from "cors";
import helmet from "helmet";

// Routers
import UserRouter from './presentation/routers/user-router'
import ItemRouter from "./presentation/routers/item-router";
import CompanyRouter from "./presentation/routers/company-router";
import AuthenticationRouter from "./presentation/routers/authentication-router";


//Use cases
import { UpsertUser } from './domain/use-cases/user/upsert-user'
import { GetUserById } from "./domain/use-cases/user/get-user-by-id";

import { UpsertItem } from "./domain/use-cases/item/upsert-item";
import { GetAllItems } from "./domain/use-cases/item/get-all-items";

import { CreateCompany } from "./domain/use-cases/company/create-company";
import { GetCompanyByNIT } from "./domain/use-cases/company/get-company-by-NIT";
import { GetAllCompanies } from "./domain/use-cases/company/get-all-companies";
import { DeleteCompany } from "./domain/use-cases/company/delete-company";

import { Login } from "./domain/use-cases/authentication/login";
import { secured } from "./domain/middlewares";

server.use(helmet.contentSecurityPolicy());
server.use(helmet.hidePoweredBy());
server.use(helmet.hsts());
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());
server.use(helmet.permittedCrossDomainPolicies());
server.use(helmet.referrerPolicy());
server.use(cors() as (req, res, next) => {});


const userMiddleWare = UserRouter(
  new UpsertUser(AppDataSource),
  new GetUserById(AppDataSource),
)

const itemMiddleware = ItemRouter(
  new UpsertItem(AppDataSource),
  new GetAllItems(AppDataSource),
)

const companyMiddleware = CompanyRouter(
  new CreateCompany(AppDataSource),
  new GetCompanyByNIT(AppDataSource),
  new GetAllCompanies(AppDataSource),
  new DeleteCompany(AppDataSource)
)

const authenticationMiddleware = AuthenticationRouter(
  new Login(AppDataSource)
)

server.use("/api/auth", authenticationMiddleware);

server.use(secured());
// Routes
server.use("/api/user", userMiddleWare);
server.use("/api/item", itemMiddleware);
server.use("/api/company", companyMiddleware);

AppDataSource.initialize()
  .then(() => {
    server.listen(3001, () => console.log("Server running"));
  })
  .catch((error) => console.log(error))

