import { Request } from "express";

export type Error = {
    name: string;
    message: string;
}

export type JWT = {
    userId: number;
}

export type AuthenticatedRequest = Request & JWT;