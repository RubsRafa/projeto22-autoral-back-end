import { Error } from "@/protocols";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'InternalServerError',
        message: 'Internal Server Error',
    });
}