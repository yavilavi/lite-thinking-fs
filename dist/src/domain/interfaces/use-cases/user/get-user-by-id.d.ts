import { User } from "../../../entities/user.entity";
export interface GetUserByIdUseCase {
    execute(userId: number): Promise<User | null>;
}
//# sourceMappingURL=get-user-by-id.d.ts.map