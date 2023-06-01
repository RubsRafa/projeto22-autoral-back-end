import { getPostsService } from "../services";
import { AuthenticatedRequest, JWT } from "../protocols";
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