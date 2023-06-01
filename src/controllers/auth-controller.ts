import { createUser } from "../services";
import { UserType } from "../protocols";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function singUp(req: Request, res: Response, next: NextFunction) {
    const user = req.body as UserType;
    try {
        await createUser(user);
        return res.status(httpStatus.OK).send('User created successfully!')
        
    } catch (e) {
        if(e.name === 'DuplicatedEmailError') return res.sendStatus(httpStatus.UNAUTHORIZED);
        next(e);
    }
}