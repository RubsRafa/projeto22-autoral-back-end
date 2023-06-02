import { commentPost, removeCommentPost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const commentsRouter = Router();

commentsRouter
  .all('/*', authenticateToken)
  .post('/', commentPost)
  .delete('/', removeCommentPost)

export {
    commentsRouter
}