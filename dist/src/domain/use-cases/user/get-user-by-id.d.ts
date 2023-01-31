import { GetUserByIdUseCase } from "../../interfaces/use-cases/user/get-user-by-id";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
export declare class GetUserById implements GetUserByIdUseCase {
    userRepository: Repository<User>;
    constructor(dataSource: DataSource);
    execute(userId: number): Promise<User | null>;
}
//# sourceMappingURL=get-user-by-id.d.ts.map