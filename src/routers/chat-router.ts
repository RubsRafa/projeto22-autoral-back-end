import { getUserMessages } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const chatRouter = Router();

chatRouter
  .all('/*', authenticateToken)
  .get('/:chatId', getUserMessages)


export { chatRouter };