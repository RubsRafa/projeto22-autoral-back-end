import { getUsersInfoController } from "../controllers";
import { Router } from "express";

const userRouter = Router();

userRouter
  .get('/:userId', getUsersInfoController)

export { userRouter };