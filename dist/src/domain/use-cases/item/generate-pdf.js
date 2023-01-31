"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateStockPDF = void 0;
const item_entity_1 = require("../../entities/item.entity");
const utils_1 = require("../../../utils");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
class GenerateStockPDF {
    constructor(dataSource) {
        this.itemRepository = dataSource.getRepository(item_entity_1.Item);
    }
    execute(recipientEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const today = new Date();
                let doc = new PDFDocument({ margin: 30, size: 'A4' });
                const fileName = `stock_${today.getTime()}.pdf`;
                let file = fs.createWriteStream(fileName);
                doc.pipe(file);
                const [items] = yield this.itemRepository
                    .createQueryBuilder("item")
                    .leftJoinAndSelect("item.company", "company")
                    .where("company.isDeleted = :isDeleted", { isDeleted: false })
                    .getManyAndCount();
                const table = {
                    title: "Items Inventory",
                    subtitle: (new Date()).toLocaleDateString(),
                    headers: [
                        { label: 'Id', property: 'id' },
                        { label: 'Name', property: 'name' },
                        { label: 'Stock', property: 'stock' },
                        { label: 'Company', property: 'company' }
                    ],
                    datas: items.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            stock: item.stock,
                            company: item.company.name
                        };
                    })
                };
                yield doc.table(table);
                doc.end();
                return new Promise((resolve, reject) => {
                    file.on("finish", function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                console.log("Uploading to s3");
                                const response = yield (0, utils_1.uploadToS3)(fileName);
                                console.log("s3 uploaded");
                                console.log("uploadToS3 Response", response);
                                console.log("sendEmail Response", (yield (0, utils_1.sendEmailWithMailJet)(recipientEmail, fileName)).response.data);
                                resolve({
                                    status: "success",
                                    fileUrl: fileName,
                                });
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                    });
                });
            }
            catch (e) {
                console.log(e);
                // @ts-ignore
                throw new Error(e.message);
            }
        });
    }
}
exports.GenerateStockPDF = GenerateStockPDF;
//# sourceMappingURL=generate-pdf.js.map