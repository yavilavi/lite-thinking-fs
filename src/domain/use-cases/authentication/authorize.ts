import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AuthorizeUseCase } from "../../interfaces/use-cases/authentication/authorize";

const jwt = require('jsonwebtoken');


export class Authorize implements AuthorizeUseCase {
  userRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User)
  }

  async execute(): Promise<boolean> {
    return false
  }
}
