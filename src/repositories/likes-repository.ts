import { prisma } from "../config";

export async function like(userId: number, postId: number) {
    return await prisma.likes.create({
        data: {
            userId,
            postId,
        }
    })
}

export async function findPostById(postId: number) {
    return await prisma.posts.findFirst({
        where: {
            id: postId,
        }
    })
}

export async function findLikeByPost(postId: number) {
    return await prisma.likes.findMany({
        where: {
            postId,
        }
    })
}

export async function dislike(id: number) {
    return await prisma.likes.delete({
        where: {
            id,
        }
    })
}