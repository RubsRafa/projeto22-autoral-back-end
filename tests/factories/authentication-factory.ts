import { prisma } from "@/config";
import { faker } from "@faker-js/faker";


export async function createUser() {
    return await prisma.users.create({
        data: {
            name: faker.word.words(),
            email: faker.internet.email(),
            password: faker.word.words(),
            image: faker.image.avatar(),
        }
    })
}

export function returnUserBody(email?: string) {
    return {
        name: faker.word.words(),
        email: email || faker.internet.email(),
        password: faker.word.words(),
        image: faker.image.avatar(),
    }
}