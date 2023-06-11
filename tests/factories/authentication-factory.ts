import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import bcrypt from 'bcrypt';


export async function createUser(user?: Partial<Users>) {
    const incomingPassword = user?.password || faker.internet.password();
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return await prisma.users.create({
        data: {
            name: faker.internet.displayName(),
            email: user?.email || faker.internet.email(),
            password: hashedPassword,
            image: faker.image.avatar(),
        }
    })
}

export function returnUserBody(email?: string) {
    return {
        name: faker.internet.displayName(),
        email: email || faker.internet.email(),
        password: faker.internet.password(),
        image: faker.image.avatar(),
    }
}

export function userSignIn(email: string, password: string) {
    return {
        email,
        password,
    }
}