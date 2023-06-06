import { Follows, Posts, Users } from '@prisma/client';
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

export type UserType = Users;

export type PostParams = Omit<Posts, 'id'|'userId'|'createdAt'|'updatedAt'>

export type PostId = {
  postId: number;
}

export type CommentParams = {
  comment: string;
  postId: number;
}

export type invalidError = Error & {
  details: string[];
};

export type EditUserParams = {
  name?: string|null;
  email?: string|null;
  password?: string|null;
  confirmPassword?: string|null;
  image?: string|null;
  birthday?: Date|null;
}

export type FollowParams = {
  id: number;
  userId: number;
  userIdIFollow: number;
  userName: string;
  userImage: string;
}

export type FollowId = {
  userIdIFollow: number;
}