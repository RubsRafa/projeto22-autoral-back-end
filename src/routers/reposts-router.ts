import { addRepostPost, removeRepostPost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const repostsRouter = Router();

repostsRouter
  .all('/*', authenticateToken)
  .post('/', addRepostPost)
  .delete('/', removeRepostPost)

export { repostsRouter }