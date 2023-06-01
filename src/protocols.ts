import { NextFunction, Request, Response } from 'express';

export type Error = {
  name: string;
  message: string;
};

export type JWT = {
  userId: number;
};

export type AuthenticatedRequest = Request & JWT;

export type validationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type SignInParams = {
  email: string;
  password: string;
};
