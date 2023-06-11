import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { Posts, Users } from "@prisma/client";

export async function createComment(user: Users, post: Posts) {
    return await prisma.comments.create({
        data: {
            userId: user.id,
            postId: post.id,
            comment: faker.word.words(),
        }
    })
}