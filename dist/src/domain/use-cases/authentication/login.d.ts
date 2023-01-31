import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { ILoginResponse } from "../../interfaces/types/authenticate";
import { LoginUseCase } from "../../interfaces/use-cases/authentication/login";
export declare class Login implements LoginUseCase {
    userRepository: Repository<User>;
    constructor(dataSource: DataSource);
    execute(email: string, password: string): Promise<ILoginResponse>;
}
//# sourceMappingURL=login.d.ts.map