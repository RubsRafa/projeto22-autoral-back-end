import { prisma } from "@/config";
import { Posts, Users } from "@prisma/client";

export async function createRepost(user: Users, post: Posts) {
    return await prisma.reposts.create({
        data: {
            userId: user.id,
            postId: post.id,
        }
    })
}

export function bodyRepost(post: Posts) {
    return {
        postId: post.id,
    }
}