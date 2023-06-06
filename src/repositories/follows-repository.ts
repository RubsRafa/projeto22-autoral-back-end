import { prisma } from "../config";

export async function getAllFollows(userId: number) {
    return await prisma.follows.findMany({
        where: {
            userId,
        },
    })
}

export async function getAllUsers() {
    return await prisma.users.findMany({})
}

export async function createFollow(userId: number, userIdIFollow: number) {
    return await prisma.follows.create({
        data: {
            userId,
            userIdIFollow,
        }
    })
}