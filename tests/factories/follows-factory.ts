import { prisma } from "@/config";
import { Users } from "@prisma/client";

export async function createFollow(user: Users, follow: Users) {
    return await prisma.follows.create({
        data: {
            userId: user.id,
            userIdIFollow: follow.id
        }
    })
}