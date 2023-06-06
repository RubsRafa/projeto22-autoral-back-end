import { findMyFollows, followUser } from "../services";
import { AuthenticatedRequest, FollowId, JWT } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getMyFollows(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    try {
        const follows = await findMyFollows(userId);
        return res.status(httpStatus.OK).send(follows);
    } catch (e) {
        next(e);
    }
}

export async function followAnUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const { userIdIFollow } = req.body as FollowId;
    try {
        const follows = await followUser(userId, userIdIFollow);
        return res.status(httpStatus.OK).send(follows);
    } catch (e) {
        next(e);
    }
}