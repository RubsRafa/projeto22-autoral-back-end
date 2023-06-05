import { getUserInfoService } from "../services";
import { AuthenticatedRequest } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getUsersInfoController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    try {
        const userInfo = await getUserInfoService(userId);
        return res.status(httpStatus.OK).send(userInfo);
    } catch (e) {
        next(e);
    }
}