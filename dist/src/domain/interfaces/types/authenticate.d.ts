import { User } from "../../entities/user.entity";
export interface ILoginResponse {
    user?: Omit<User, "password">;
    accessToken?: string;
    authenticated: boolean;
}
//# sourceMappingURL=authenticate.d.ts.map