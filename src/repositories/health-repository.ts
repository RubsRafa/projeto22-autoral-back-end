import { prisma } from "../config";

export async function getUserDiary(id: number) {
    return await prisma.health.findMany({
        where: {
            userId: id,
        }
    })
}

const healthRepository = {
    getUserDiary,
}

export default healthRepository;