import { prisma } from "../config";

export async function addComment(userId: number, postId: number, comment: string) {
    return await prisma.comments.create({
        data: {
            userId,
            postId,
            comment,
        }
    })
}

export async function findComment(id: number) {
    return await prisma.comments.findUnique({
        where: {
            id,
        }
    })
}

export async function removeComment(id: number) {
    return await prisma.comments.delete({
        where: {
            id,
        }
    })
}