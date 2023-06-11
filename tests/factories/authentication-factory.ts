import { prisma } from "@/config";
import { faker } from "@faker-js/faker";


export async function createUser() {
    return await prisma.users.create({
        data: {
            name: faker.word.words(),
            email: faker.word.words(),
            password: faker.word.words(),
            image: faker.image.avatar(),
        }
    })
}

export function invalidBody() {
    return {
        name: faker.number.bigInt(),
        image: faker.number.bigInt(),
    }
}

export function returnUserBody(email: string) {
    return {
        name: faker.word.words(),
        email,
        password: faker.word.words(),
        image: faker.image.avatar(),
    }
}