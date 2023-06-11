import { authenticateToken, validateBody } from "../middlewares";
import { editUserInfoController, getUsersInfoController } from "../controllers";
import { Router } from "express";
import { usersEditSchema } from "../schemas";

const userRouter = Router();

userRouter
  .all('/*', authenticateToken)
  .get('/:userId', getUsersInfoController)
  .put('/edit', validateBody(usersEditSchema), editUserInfoController)

export { userRouter };