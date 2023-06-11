import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";

export async function createPost(user: Users, type: number) {
    return await prisma.posts.create({
        data: {
            userId: user.id,
            type,
            text: faker.word.words(),
        }
    })
}

export function bodyPost(type: number) {
    return {
        type,
        text: faker.word.words(),
    }
}

export function bodyPostWithNoText(type: number) {
    return {
        type,
        text: '',
    }
}

export function postWithNoVideoAndNoImage(type: number) {
    return {
        type,
        text: faker.word.words(),
    }
}