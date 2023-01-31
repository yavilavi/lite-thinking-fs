import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AuthorizeUseCase } from "../../interfaces/use-cases/authentication/authorize";
export declare class Authorize implements AuthorizeUseCase {
    userRepository: Repository<User>;
    constructor(dataSource: DataSource);
    execute(): Promise<boolean>;
}
//# sourceMappingURL=authorize.d.ts.map