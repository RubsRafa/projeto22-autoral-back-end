import { prisma } from "../config";

export async function getUserInfo(userId: number) {
    return await prisma.users.findFirst({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            birthday: true,
        }
    })

}