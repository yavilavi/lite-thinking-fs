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
const supertest_1 = __importDefault(require("supertest"));
const user_router_1 = __importDefault(require("../../../src/presentation/routers/user-router"));
const server_1 = __importDefault(require("../../../src/server"));
const data_source_1 = require("../../../src/data/data-sources/typeORM/data-source");
const upsert_user_1 = require("../../../src/domain/use-cases/user/upsert-user");
const mockedData_1 = require("../../mockedData");
const utils_1 = require("../../../src/utils");
describe("user Router", () => {
    let createUserUseCase;
    let getUserByIdUseCase;
    beforeAll(() => {
        createUserUseCase = new upsert_user_1.UpsertUser(data_source_1.AppDataSource);
        server_1.default.use("/user", (0, user_router_1.default)(createUserUseCase, getUserByIdUseCase));
        return data_source_1.AppDataSource.initialize();
    });
    beforeEach(() => {
        jest.clearAllMocks();
        return (0, utils_1.cleanDB)(data_source_1.AppDataSource);
    });
    describe("POST /user", () => {
        test("POST /user returns 201 on use case success", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post("/user").send(mockedData_1.testUserAdmin);
            expect(response.status).toBe(201);
        }));
        test("POST /user returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(createUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).post("/user").send(mockedData_1.testUserAdmin);
            expect(response.status).toBe(500);
        }));
    });
});
//# sourceMappingURL=user-router.test.js.map