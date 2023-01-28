import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { ILoginResponse } from "../../interfaces/types/authenticate";
import { verifyHash } from "../../../utils";
import { LoginUseCase } from "../../interfaces/use-cases/authentication/login";

const jwt = require('jsonwebtoken');


export class Login implements LoginUseCase {
  userRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User)
  }

  async execute(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      if (await verifyHash(password, user.password)) {
        const { name, email, id, role } = user;
        return {
          accessToken: jwt.sign(
            { name, email, id, role },
            process.env.JWT_SECRET ?? "development",
            { expiresIn: "90d" }),
          user: { name, email, id, role },
          authenticated: true
        }
      }
    }
    return { authenticated: false }
  }
}
