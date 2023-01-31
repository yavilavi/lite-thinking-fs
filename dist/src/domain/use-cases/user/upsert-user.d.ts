import { UpsertUserUseCase } from "../../interfaces/use-cases/user/upsert-user";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
export declare class UpsertUser implements UpsertUserUseCase {
    userRepository: Repository<User>;
    constructor(dataSource: DataSource);
    execute(user: User): Promise<Omit<User, "password">>;
}
//# sourceMappingURL=upsert-user.d.ts.map