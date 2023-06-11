import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";

export async function createPostType() {
    return await prisma.postType.create({
        data: {
            type: faker.word.adjective(),
        }
    })
}

export async function createPost(user: Users, postTypeId: number) {
    return await prisma.posts.create({
        data: {
            userId: user.id,
            type: postTypeId,
            text: faker.word.words(),
        }
    })
}