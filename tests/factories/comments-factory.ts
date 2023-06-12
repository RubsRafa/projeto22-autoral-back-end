import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { Comments, Posts, Users } from "@prisma/client";

export async function createComment(user: Users, post: Posts) {
    return await prisma.comments.create({
        data: {
            userId: user.id,
            postId: post.id,
            comment: faker.word.words(),
        }
    })
}

export function bodyComment(post: Posts) {
    return {
        postId: post.id,
        comment: faker.word.words(),
    }
}

export function bodyDeleteComment(comment: Comments) {
    return {
        commentId: comment.id,
    }
}