import { prisma } from "@/config";
import { MessagesParams } from "@/protocols";
import { faker } from "@faker-js/faker";
import { Chat, Users } from "@prisma/client";

export function chatReturn (user: Users, otherUser: Users): Chat {
    return {
        id: faker.number.int(),
        fromId: user.id,
        toId: otherUser.id,
        message: faker.word.words(),
        time: faker.date.anytime(),

    }
}

export function returnSendChatParams(user: Users, otherUser: Users): MessagesParams {
    return {
        fromId: user.id,
        toId: otherUser.id,
        message: faker.word.words(),
    }
}

export function returnMessages(user: Users, otherUser: Users) {
    return {
        fromId: user.id,
        toId: otherUser.id,
        message: faker.word.words(),
        Chat_fromIdToUsers: {
            id: user.id,
            name: user.name,
            image: user.image,
        },
        Chat_toIdToUsers: {
            id: otherUser.id,
            name: otherUser.name,
            image: otherUser.image,
        },
    }
}