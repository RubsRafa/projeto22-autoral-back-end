import { prisma } from "@/config";
import { Posts, Users } from "@prisma/client";

export async function createLike(user: Users, post: Posts) {
    return await prisma.likes.create({
        data: {
            userId: user.id,
            postId: post.id,
        }
    })
}

export function bodyLike(post?: Posts) {
    return {
        postId: post.id,
    }
}

export async function findLikeByUserAndPost(user: Users, post: Posts) {
    return await prisma.likes.findMany({
        where: {
            userId: user.id,
            postId: post.id
        }
    })
}