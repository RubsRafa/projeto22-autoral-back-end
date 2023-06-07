import { followAnUser, getMyFollows, removeFollow } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const followsRouter = Router();

followsRouter
  .all('/*', authenticateToken)
  .get('/:userId', getMyFollows)
  .post('/', followAnUser)
  .delete('/', removeFollow);

export {
    followsRouter
}