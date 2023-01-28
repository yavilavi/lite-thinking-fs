import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AuthenticateUseCase } from "../../interfaces/use-cases/authentication/authenticate";

const jwt = require('jsonwebtoken');


export class Authenticate implements AuthenticateUseCase {
  userRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User)
  }

  async execute(token: string): Promise<boolean> {
    return true
  }
}
