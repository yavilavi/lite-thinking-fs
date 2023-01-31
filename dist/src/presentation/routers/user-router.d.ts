import { UpsertUserUseCase } from "../../domain/interfaces/use-cases/user/upsert-user";
import { GetUserByIdUseCase } from "../../domain/interfaces/use-cases/user/get-user-by-id";
export default function UserRouter(createUserUseCase: UpsertUserUseCase, getUserByIdUseCase: GetUserByIdUseCase): import("express-serve-static-core").Router;
//# sourceMappingURL=user-router.d.ts.map