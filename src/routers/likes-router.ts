import { dislikePost, getLikes, likePost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const likesRouter = Router();

likesRouter
  .all('/*', authenticateToken)
  .get('/', getLikes)
  .post('/', likePost)
  .delete('/', dislikePost)

export {
    likesRouter
}