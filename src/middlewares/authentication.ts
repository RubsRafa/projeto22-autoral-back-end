import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWT } from '../protocols';
import { unauthorizedError } from '../errors';
import { findSession } from '../repositories';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return generateUnauthorizedResponse(res);

  const parts = authorization.split(' ');
  if (parts.length !== 2) return generateUnauthorizedResponse(res);

  const [schema, token] = parts;
  if (schema !== 'Bearer') return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWT;
    const sessions = await findSession(token);
    if (!sessions) return generateUnauthorizedResponse(res);

    if (sessions.userId !== userId) return generateUnauthorizedResponse(res);

    req.userId = userId;
    return next();
  } catch (e) {
    console.log(e);
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}