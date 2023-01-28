import { User } from "../../../entities/user.entity";

export interface UpsertUserUseCase {
  execute(user: User): Promise<Omit<User, "password">>;
}
