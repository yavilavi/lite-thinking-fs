import express from 'express'
import { Request, Response } from 'express'
import { LoginUseCase } from "../../domain/interfaces/use-cases/authentication/login";

export default function AuthenticationRouter(
  loginUseCase: LoginUseCase,
) {
  const router = express.Router();

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const response = await loginUseCase.execute(req.body.email, req.body.password);
      res.statusCode = response.authenticated? 200 : 401;
      res.json(response)
    } catch (err) {
      console.log(err);
      res.status(401).send({ message: "Error login in" })
    }
  });


  return router
};
