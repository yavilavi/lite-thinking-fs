import express from 'express'
import { Request, Response } from 'express'
import { UpsertItemUseCase } from "../../domain/interfaces/use-cases/item/upsert-item";
import { GetAllItemsUseCase } from "../../domain/interfaces/use-cases/item/get-all-items";
import { GenerateStockPDFUseCase } from "../../domain/interfaces/use-cases/item/generate-stock-pdf";
import { adminRequired } from "../../domain/middlewares";

export default function ItemRouter(
  upsertItemUseCase: UpsertItemUseCase,
  getAllItemsUseCase: GetAllItemsUseCase,
  generateStockPDFUseCase: GenerateStockPDFUseCase,
) {
  const router = express.Router();

  router.post('/', adminRequired, async (req: Request, res: Response) => {
    try {
      const item = await upsertItemUseCase.execute(req.body)
      res.statusCode = 201
      res.json(item)
    } catch (err) {
      res.status(500).send({ message: "Error saving data" })
    }
  });

  router.get('/getAll', async (req: Request, res: Response) => {
    try {
      const items = await getAllItemsUseCase.execute()
      res.statusCode = 200;
      res.json(items);
    } catch (err) {
      res.status(404).send({ message: "Item not found" })
    }
  });

  router.post('/generatePDFAndSendEmail', async (req: Request, res: Response) => {
    try {
      const doc = await generateStockPDFUseCase.execute(req.body.recipientEmail)
      // doc.pipe(res);
      // doc.end()
      res.statusCode = 200;
      res.json(doc);
    } catch (err) {
      res.status(500).send({ message: err })
    }
  });

  return router
};
