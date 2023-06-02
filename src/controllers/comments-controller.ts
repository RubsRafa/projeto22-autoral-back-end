import { addCommentService, removeCommentService } from "../services";
import { AuthenticatedRequest, CommentParams, JWT } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function commentPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const { postId, comment } = req.body as CommentParams;
    try {
        await addCommentService(userId, postId, comment);
        return res.sendStatus(httpStatus.OK);
    } catch (e) {
        next(e);
    }
}

export async function removeCommentPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const { commentId } = req.body;
    try {
        await removeCommentService(userId, commentId);
        return res.sendStatus(httpStatus.OK);
    } catch (e) {
        next(e);
    }
}