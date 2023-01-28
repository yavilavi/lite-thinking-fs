import { User } from "../../../../src/domain/entities/user.entity";
import { AppDataSource } from "../../../../src/data/data-sources/typeORM/data-source";
import { UpsertUser } from "../../../../src/domain/use-cases/user/upsert-user";
import { Repository } from "typeorm";
import { testUserAdmin } from "../../../mockedData";
import { cleanDB } from "../../../../src/utils";

describe("Create User Use Case", () => {

  let userRepository: Repository<User>;

  beforeAll(() => {
    userRepository = AppDataSource.getRepository(User);
    return AppDataSource.initialize();
  })

  beforeEach(() => {
    return cleanDB(AppDataSource);
  })

  test("should save user", async () => {
    const InputData: User = userRepository.create(testUserAdmin)
    const createUserUseCase = new UpsertUser(AppDataSource);
    const result = await createUserUseCase.execute(InputData);
    // @ts-ignore - TS2790: The operand of a 'delete' operator must be optional.
    delete result.password
    // @ts-ignore - TS2790: The operand of a 'delete' operator must be optional.
    delete InputData.password
    expect(result).toEqual(InputData);
    const created = await userRepository.findOneBy({ id: InputData.id });
    expect(created).not.toBe(null)
    expect({ id: created?.id, name: created?.name, role: created?.role, email: created?.email })
      .toEqual(InputData)
  });

})
