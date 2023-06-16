import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest, JWT } from '../protocols';
import { getAllMyMessages } from '../services';

export async function getUserMessages(req: AuthenticatedRequest, res: Response, next: NextFunction) {
//   const { userId } = req as JWT;
  const chatId = Number(req.params.chatId);
  try {
    const messages = await getAllMyMessages(chatId)
    return res.status(httpStatus.OK).send(messages);
  } catch (e) {
    next(e);
  }
}