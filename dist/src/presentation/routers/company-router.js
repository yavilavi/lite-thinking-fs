"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../domain/middlewares");
function CompanyRouter(createCompanyUseCase, getCompanyByNITUseCase, getAllCompaniesUseCase, deleteCompanyUseCase, updateCompanyUseCase) {
    const router = express_1.default.Router();
    router.post('/', middlewares_1.adminRequired, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const company = yield createCompanyUseCase.execute(req.body);
            res.statusCode = 201;
            res.json(company);
        }
        catch (err) {
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.get('/getByNIT/:NIT', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const company = yield getCompanyByNITUseCase.execute(req.params.NIT);
            res.statusCode = !company ? 404 : 200;
            res.json(!company ? { message: "Company not found" } : company);
        }
        catch (err) {
            res.status(404).send({ message: "Company not found" });
        }
    }));
    router.get('/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const companies = yield getAllCompaniesUseCase.execute();
            res.statusCode = 200;
            res.json(companies);
        }
        catch (err) {
            res.status(500).send({ message: "Error fetching companies" });
        }
    }));
    router.delete('/:NIT', middlewares_1.adminRequired, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const deleted = yield deleteCompanyUseCase.execute(req.params.NIT);
            res.statusCode = !deleted || (deleted === null || deleted === void 0 ? void 0 : deleted.affected) === 0 ? 404 : 200;
            ;
            res.json(!deleted || (deleted === null || deleted === void 0 ? void 0 : deleted.affected) === 0 ? { message: "Company not found" } : deleted);
        }
        catch (err) {
            res.status(500).send({ message: "Error fetching companies" });
        }
    }));
    router.put('/:NIT', middlewares_1.adminRequired, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const updated = yield updateCompanyUseCase.execute(req.body, req.params.NIT);
            res.statusCode = !updated || (updated === null || updated === void 0 ? void 0 : updated.affected) === 0 ? 404 : 200;
            ;
            res.json(!updated || (updated === null || updated === void 0 ? void 0 : updated.affected) === 0 ? { message: "Company not found" } : updated);
        }
        catch (err) {
            res.status(500).send({ message: "Error updating company" });
        }
    }));
    return router;
}
exports.default = CompanyRouter;
;
//# sourceMappingURL=company-router.js.map