"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const data_source_1 = require("./data/data-sources/typeORM/data-source");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Routers
const user_router_1 = __importDefault(require("./presentation/routers/user-router"));
const item_router_1 = __importDefault(require("./presentation/routers/item-router"));
const company_router_1 = __importDefault(require("./presentation/routers/company-router"));
const authentication_router_1 = __importDefault(require("./presentation/routers/authentication-router"));
//Use cases
const upsert_user_1 = require("./domain/use-cases/user/upsert-user");
const get_user_by_id_1 = require("./domain/use-cases/user/get-user-by-id");
const upsert_item_1 = require("./domain/use-cases/item/upsert-item");
const get_all_items_1 = require("./domain/use-cases/item/get-all-items");
const create_company_1 = require("./domain/use-cases/company/create-company");
const get_company_by_NIT_1 = require("./domain/use-cases/company/get-company-by-NIT");
const get_all_companies_1 = require("./domain/use-cases/company/get-all-companies");
const delete_company_1 = require("./domain/use-cases/company/delete-company");
const login_1 = require("./domain/use-cases/authentication/login");
const middlewares_1 = require("./domain/middlewares");
const update_company_1 = require("./domain/use-cases/company/update-company");
const generate_pdf_1 = require("./domain/use-cases/item/generate-pdf");
server_1.default.use(helmet_1.default.contentSecurityPolicy());
server_1.default.use(helmet_1.default.hidePoweredBy());
server_1.default.use(helmet_1.default.hsts());
server_1.default.use(helmet_1.default.ieNoOpen());
server_1.default.use(helmet_1.default.noSniff());
server_1.default.use(helmet_1.default.permittedCrossDomainPolicies());
server_1.default.use(helmet_1.default.referrerPolicy());
server_1.default.use((0, cors_1.default)());
const userMiddleWare = (0, user_router_1.default)(new upsert_user_1.UpsertUser(data_source_1.AppDataSource), new get_user_by_id_1.GetUserById(data_source_1.AppDataSource));
const itemMiddleware = (0, item_router_1.default)(new upsert_item_1.UpsertItem(data_source_1.AppDataSource), new get_all_items_1.GetAllItems(data_source_1.AppDataSource), new generate_pdf_1.GenerateStockPDF(data_source_1.AppDataSource));
const companyMiddleware = (0, company_router_1.default)(new create_company_1.CreateCompany(data_source_1.AppDataSource), new get_company_by_NIT_1.GetCompanyByNIT(data_source_1.AppDataSource), new get_all_companies_1.GetAllCompanies(data_source_1.AppDataSource), new delete_company_1.DeleteCompany(data_source_1.AppDataSource), new update_company_1.UpdateCompany(data_source_1.AppDataSource));
const authenticationMiddleware = (0, authentication_router_1.default)(new login_1.Login(data_source_1.AppDataSource));
server_1.default.use("/api/auth", authenticationMiddleware);
server_1.default.use((0, middlewares_1.secured)());
// Routes
server_1.default.use("/api/user", userMiddleWare);
server_1.default.use("/api/item", itemMiddleware);
server_1.default.use("/api/company", companyMiddleware);
data_source_1.AppDataSource.initialize()
    .then(() => {
    server_1.default.listen(3001, () => console.info("Server running"));
})
    .catch((error) => console.error(error));
//# sourceMappingURL=main.js.map