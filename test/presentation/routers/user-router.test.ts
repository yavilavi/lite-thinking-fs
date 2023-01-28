import request from "supertest";
import { UpsertUserUseCase } from "../../../src/domain/interfaces/use-cases/user/upsert-user";
import UserRouter from "../../../src/presentation/routers/user-router";
import server from "../../../src/server";
import { AppDataSource } from "../../../src/data/data-sources/typeORM/data-source";
import { UpsertUser } from "../../../src/domain/use-cases/user/upsert-user";
import { testUserAdmin } from "../../mockedData";
import { cleanDB } from "../../../src/utils";
import { GetUserByIdUseCase } from "../../../src/domain/interfaces/use-cases/user/get-user-by-id";

describe("user Router", () => {
  let createUserUseCase: UpsertUserUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeAll(() => {
    createUserUseCase = new UpsertUser(AppDataSource);
    server.use("/user", UserRouter(createUserUseCase, getUserByIdUseCase))
    return AppDataSource.initialize();
  })

  beforeEach(() => {
    jest.clearAllMocks();
    return cleanDB(AppDataSource);
  })

  describe("POST /user", () => {

    test("POST /user returns 201 on use case success", async () => {
      const response = await request(server).post("/user").send(testUserAdmin)
      expect(response.status).toBe(201)
    });

    test("POST /user returns 500 on use case error", async () => {
      jest.spyOn(createUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
      const response = await request(server).post("/user").send(testUserAdmin)
      expect(response.status).toBe(500)
    });
  })

})
