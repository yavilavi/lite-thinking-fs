export interface GenerateStockPDFUseCase {
  execute(sendTo: string): Promise<{ status: string, fileUrl: string }>;
}
