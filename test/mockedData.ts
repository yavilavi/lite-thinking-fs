import { User } from "../src/domain/entities/user.entity";

export const testUserAdmin: User = {
  id: 1,
  name: "admin",
  email: "admin1@mail.com",
  password: "password",
  role: "ADMIN"
}
export const testUserExternal: User = {
  id: 1,
  name: "admin",
  email: "admin1@mail.com",
  password: "password",
  role: "EXTERNAL"
}
