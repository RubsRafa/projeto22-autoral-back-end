import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Error } from '../protocols';

export function handleErrors(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }

  if (err.name === 'UnauthorizedError' || err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
