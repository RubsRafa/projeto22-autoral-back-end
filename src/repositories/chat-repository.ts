import { prisma } from "../config";

export async function getMyMessages(chatId: number) {
    return await prisma.messages.findMany({
        where: {
            chatId,
        }
    })
}

export async function findChatById(chatId: number) {
    return await prisma.chat.findUnique({
        where: {
            id: chatId,
        }
    })
}


const chatRepository = {
    getMyMessages,
    findChatById,
}

export default chatRepository;