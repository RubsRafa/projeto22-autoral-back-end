import { dislikePost, likePost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const likesRouter = Router();

likesRouter
  .all('/*', authenticateToken)
  .post('/', likePost)
  .delete('/', dislikePost)

export {
    likesRouter
}