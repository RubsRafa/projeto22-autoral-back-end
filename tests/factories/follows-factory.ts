import { prisma } from "@/config";
import { Follows, Users } from "@prisma/client";

export async function createFollow(user: Users, follow: Users) {
    return await prisma.follows.create({
        data: {
            userId: user.id,
            userIdIFollow: follow.id
        }
    })
}

export function bodyPostFollows(user: Users) {
    return {
        userIdIFollow: user.id,
    }
}

export function bodyDeleteFollow(follow: Follows) {
    return {
        followId: follow.id
    }
}