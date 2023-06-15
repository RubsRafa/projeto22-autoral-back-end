import { getUserHumorDiary } from "../controllers";
import { authenticateToken } from "../middlewares";
import { Router } from "express";

const healthRouter = Router();

healthRouter
  .all('/*', authenticateToken)
  .get('/', getUserHumorDiary)

export { healthRouter};