import { Router } from "express";
import { signInSchema, signUpSchema } from "../schemas";
import { validateBody } from "../middlewares";
import { singUp } from "../controllers";

const authRouter = Router();

authRouter
  .post('/signup', validateBody(signUpSchema), singUp)

export { authRouter };
