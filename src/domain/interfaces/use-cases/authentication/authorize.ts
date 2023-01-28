export interface AuthorizeUseCase {
  execute(): Promise<boolean>;
}
