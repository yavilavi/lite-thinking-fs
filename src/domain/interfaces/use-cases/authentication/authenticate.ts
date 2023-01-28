export interface AuthenticateUseCase {
  execute(token: string): Promise<boolean>;
}
