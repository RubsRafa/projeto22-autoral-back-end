import { faker } from "@faker-js/faker";
import { Health, Users } from "@prisma/client";

export function returnHealth(user: Users): Health {
    return {
        id: faker.number.int(),
        userId: user.id,
        date: faker.date.anytime(),
        text: faker.word.words(),
        color: faker.color.rgb(),
        mood: 3,
    }
}

export function returnChangeHumor(user: Users) {
    return {
        userId: user.id,
        text: faker.word.words(),
        color: faker.color.rgb(),
        mood: 4,
    }
}