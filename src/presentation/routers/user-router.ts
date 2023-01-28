import express from 'express'
import { Request, Response } from 'express'
import { UpsertUserUseCase } from "../../domain/interfaces/use-cases/user/upsert-user";
import { GetUserByIdUseCase } from "../../domain/interfaces/use-cases/user/get-user-by-id";

export default function UserRouter(
  createUserUseCase: UpsertUserUseCase,
  getUserByIdUseCase: GetUserByIdUseCase
) {
  const router = express.Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      const user = await createUserUseCase.execute(req.body)
      res.statusCode = 201
      res.json(user)
    } catch (err) {
      res.status(500).send({ message: "Error saving data" })
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const user = await getUserByIdUseCase.execute(Number(req.params.id))
      res.statusCode = !user ? 404 : 200;
      res.json(!user ? { message: "User not found" } : user);
    } catch (err) {
      res.status(404).send({ message: "User not found" })
    }
  });

  return router
};
