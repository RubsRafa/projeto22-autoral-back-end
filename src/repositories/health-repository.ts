import { prisma } from "../config";

export async function getUserDiary(id: number) {
    return await prisma.health.findMany({
        where: {
            userId: id,
        }
    })
}

export async function addHumor(userId: number, text: string, color: string, mood: number) {
    return await prisma.health.create({
        data: {
            userId,
            text,
            color,
            mood
        }
    })
}

const healthRepository = {
    getUserDiary,
    addHumor
}

export default healthRepository;