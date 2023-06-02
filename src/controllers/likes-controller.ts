import { addLike, removeLike } from "../services";
import { AuthenticatedRequest, JWT, PostId } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function likePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const { postId } = req.body as PostId;
    try {
        await addLike(userId, postId);
        return res.sendStatus(httpStatus.OK);
    } catch (e) {
        next(e);
    }
}

export async function dislikePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const { postId } = req.body as PostId;
    try {
        await removeLike(userId, postId);
        return res.sendStatus(httpStatus.OK);
    } catch (e) {
        next(e);
    }
}