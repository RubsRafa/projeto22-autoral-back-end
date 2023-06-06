import { followAnUser, getMyFollows } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const followsRouter = Router();

followsRouter
  .all('/*', authenticateToken)
  .get('/:userId', getMyFollows)
  .post('/', followAnUser)

export {
    followsRouter
}