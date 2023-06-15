import { addHumor, changeHumorItem, deleteHumorItem, getUserHumorDiary } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const healthRouter = Router();

healthRouter
  .all('/*', authenticateToken)
  .get('/', getUserHumorDiary)
  .post('/', addHumor)
  .put('/', changeHumorItem)
  .delete('/', deleteHumorItem)

export { healthRouter};