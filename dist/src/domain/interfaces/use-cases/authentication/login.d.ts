import { ILoginResponse } from "../../types/authenticate";
export interface LoginUseCase {
    execute(email: string, password: string): Promise<ILoginResponse>;
}
//# sourceMappingURL=login.d.ts.map