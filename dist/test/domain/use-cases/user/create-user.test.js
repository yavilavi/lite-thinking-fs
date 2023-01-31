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
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../../../src/domain/entities/user.entity");
const data_source_1 = require("../../../../src/data/data-sources/typeORM/data-source");
const upsert_user_1 = require("../../../../src/domain/use-cases/user/upsert-user");
const mockedData_1 = require("../../../mockedData");
const utils_1 = require("../../../../src/utils");
describe("Create User Use Case", () => {
    let userRepository;
    beforeAll(() => {
        userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        return data_source_1.AppDataSource.initialize();
    });
    beforeEach(() => {
        return (0, utils_1.cleanDB)(data_source_1.AppDataSource);
    });
    test("should save user", () => __awaiter(void 0, void 0, void 0, function* () {
        const InputData = userRepository.create(mockedData_1.testUserAdmin);
        const createUserUseCase = new upsert_user_1.UpsertUser(data_source_1.AppDataSource);
        const result = yield createUserUseCase.execute(InputData);
        // @ts-ignore - TS2790: The operand of a 'delete' operator must be optional.
        delete result.password;
        // @ts-ignore - TS2790: The operand of a 'delete' operator must be optional.
        delete InputData.password;
        expect(result).toEqual(InputData);
        const created = yield userRepository.findOneBy({ id: InputData.id });
        expect(created).not.toBe(null);
        expect({ id: created === null || created === void 0 ? void 0 : created.id, name: created === null || created === void 0 ? void 0 : created.name, role: created === null || created === void 0 ? void 0 : created.role, email: created === null || created === void 0 ? void 0 : created.email })
            .toEqual(InputData);
    }));
});
//# sourceMappingURL=create-user.test.js.map