import { commentPost, getCommentsPosts, removeCommentPost } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const commentsRouter = Router();

commentsRouter
  .all('/*', authenticateToken)
  .get('/', getCommentsPosts)
  .post('/', commentPost)
  .delete('/', removeCommentPost)

export {
    commentsRouter
}