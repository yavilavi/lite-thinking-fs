import { UpsertUserUseCase } from "../../interfaces/use-cases/user/upsert-user";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { hash } from "../../../utils";


export class UpsertUser implements UpsertUserUseCase {
  userRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User)
  }

  async execute(user: User): Promise<Omit<User,"password">> {
    const newUser = new User();
    newUser.email = user.email;
    newUser.name = user.name;
    newUser.role = user.role;
    newUser.password = await hash(user.password);
    const { id, email, name, role } = await this.userRepository.save(newUser)
    return { id, email, name, role }
  }
}
