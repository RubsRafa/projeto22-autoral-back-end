import { MessagesParams } from "@/protocols";
import { prisma } from "../config";

export async function getMyMessages() {
    return await prisma.chat.findMany({})
}

export async function findChatById(id: number) {
    return await prisma.chat.findUnique({
        where: {
            id,
        }
    })
}

export async function sendMessages(body: MessagesParams){
    return await prisma.chat.create({
        data: {
            fromId: body.fromId,
            toId: body.toId,
            message: body.message
        }
    })
}

export async function deleteMessage(messageId: number) {
    return await prisma.chat.delete({
        where: {
            id: messageId
        }
    })
}

const chatRepository = {
    getMyMessages,
    findChatById,
    sendMessages, 
    deleteMessage,
}

export default chatRepository;