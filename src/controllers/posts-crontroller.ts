import { getPostsService, postPost } from "../services";
import { AuthenticatedRequest, JWT, PostParams } from "../protocols";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const posts = await getPostsService();
        return res.status(httpStatus.OK).send(posts);
        
    } catch (e) {
        next(e);
    }
}

export async function postAPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req as JWT;
    const body = req.body as PostParams;
    try {
        await postPost(userId, body);
        return res.sendStatus(httpStatus.CREATED);
    } catch (e) {
        next(e);
    }
}