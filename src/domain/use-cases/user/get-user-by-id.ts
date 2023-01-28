import { GetUserByIdUseCase } from "../../interfaces/use-cases/user/get-user-by-id";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";


export class GetUserById implements GetUserByIdUseCase {
  userRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User)
  }

  async execute(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: userId } })
  }
}
