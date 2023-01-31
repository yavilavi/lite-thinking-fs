export interface GenerateStockPDFUseCase {
    execute(sendTo: string): Promise<{
        status: string;
        fileUrl: string;
    }>;
}
//# sourceMappingURL=generate-stock-pdf.d.ts.map