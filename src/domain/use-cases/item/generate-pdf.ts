import { DataSource, Repository } from "typeorm";
import { GenerateStockPDFUseCase } from "../../interfaces/use-cases/item/generate-stock-pdf";
import { Item } from "../../entities/item.entity";

const fs = require("fs");
const PDFDocument = require("pdfkit-table");


export class GenerateStockPDF implements GenerateStockPDFUseCase {
  itemRepository: Repository<Item>

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item)
  }

  async execute(): Promise<boolean> {
    try {
      let doc = new PDFDocument({ margin: 30, size: 'A4' });
      // const companies = await this.itemRepository.find({
      //   where:{},
      //   relations: {
      //     company: true
      //   }
      // });
      const items = await this.itemRepository
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.company", "company")
        .where("company.isDeleted = :isDeleted", { isDeleted: false })
        .getManyAndCount();
      console.log(items)
      // doc.pipe(fs.createWriteStream("./document.pdf"));
      return true
    } catch (e) {
      console.log(e);
      return false;
    }
    // init document

  }
}
