import { authenticateToken, validateBody } from "../middlewares";
import { getPosts, postAPost } from "../controllers";
import { Router } from "express";
import { postsSchema } from "../schemas";

const postsRouter = Router();

postsRouter
  .all('/*', authenticateToken)
  .get('/', getPosts)
  .post('/', validateBody(postsSchema), postAPost);

export { postsRouter };