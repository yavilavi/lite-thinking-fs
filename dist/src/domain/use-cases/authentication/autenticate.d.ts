import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AuthenticateUseCase } from "../../interfaces/use-cases/authentication/authenticate";
export declare class Authenticate implements AuthenticateUseCase {
    userRepository: Repository<User>;
    constructor(dataSource: DataSource);
    execute(token: string): Promise<boolean>;
}
//# sourceMappingURL=autenticate.d.ts.map