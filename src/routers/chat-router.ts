import { ChatSchema } from "../schemas";
import { deleteMessage, getUserMessages, sendNewMessages } from "../controllers";
import { authenticateToken, validateBody } from "../middlewares";
import { Router } from "express";

const chatRouter = Router();

chatRouter
  .all('/*', authenticateToken)
  .get('/', getUserMessages)
  .post('/', validateBody(ChatSchema),sendNewMessages)
  .delete('/:messageId', deleteMessage)


export { chatRouter };