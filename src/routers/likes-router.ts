import { dislikePost, getAllLikes, getLikes, likePost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const likesRouter = Router();

likesRouter
  .all('/*', authenticateToken)
  .get('/users', getAllLikes)
  .get('/', getLikes)
  .post('/', likePost)
  .delete('/', dislikePost)

export {
    likesRouter
}