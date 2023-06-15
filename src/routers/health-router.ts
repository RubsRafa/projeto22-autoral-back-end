import { addHumor, changeHumorItem, getUserHumorDiary } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const healthRouter = Router();

healthRouter
  .all('/*', authenticateToken)
  .get('/', getUserHumorDiary)
  .post('/', addHumor)
  .put('/', changeHumorItem)

export { healthRouter};