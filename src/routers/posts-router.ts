import { authenticateToken } from "../middlewares";
import { getPosts } from "../controllers";
import { Router } from "express";

const postsRouter = Router();

postsRouter
  .all('/*', authenticateToken)
  .get('/', getPosts);

export { postsRouter };