import { DataSource, Repository } from "typeorm";
import { GenerateStockPDFUseCase } from "../../interfaces/use-cases/item/generate-stock-pdf";
import { Item } from "../../entities/item.entity";
import { sendEmailWithMailJet, uploadToS3 } from "../../../utils";


const fs = require("fs");
const PDFDocument = require("pdfkit-table");


export class GenerateStockPDF implements GenerateStockPDFUseCase {
  itemRepository: Repository<Item>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item)
  }

  async execute(recipientEmail: string): Promise<{ status: string, fileUrl: string }> {
    try {
      const today = new Date();
      let doc = new PDFDocument({ margin: 30, size: 'A4' });
      const fileName = `stock_${ today.getTime() }.pdf`
      let file = fs.createWriteStream(fileName)
      doc.pipe(file);
      const [ items ] = await this.itemRepository
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
        datas: (items as Item[]).map((item) => {
          return {
            id: item.id,
            name: item.name,
            stock: item.stock,
            company: item.company.name
          };
        })
      }
      await doc.table(table)
      doc.end();
      return new Promise((resolve, reject) => {
        file.on("finish", async function () {
          try {
            const response = await uploadToS3(fileName);
            console.log("uploadToS3 Response", response);
            console.log("sendEmail Response", (await sendEmailWithMailJet(recipientEmail, fileName)).response.data);
            resolve({
              status: "success",
              fileUrl: fileName,
            });
          } catch (e) {
            reject(e)
          }
        });
      })
    } catch (e) {
      console.log(e);
      // @ts-ignore
      throw new Error(e.message)
    }
  }
}
