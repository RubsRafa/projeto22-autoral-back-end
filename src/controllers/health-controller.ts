import { getUserHumor } from "../services";
import { AuthenticatedRequest, JWT } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getUserHumorDiary(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    try {
        const diary = await getUserHumor(userId);
        return res.status(httpStatus.OK).send(diary);
    } catch (e) {
        next(e);
    }
}