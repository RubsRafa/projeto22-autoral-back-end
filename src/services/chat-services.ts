import { notFoundError } from "../errors";
import { findChatById, getMyMessages } from "../repositories";

export async function getAllMyMessages(chatId: number) {
    console.log('chegou aqui?')
    const chatExist = await findChatById(chatId)
    if(!chatExist) throw notFoundError();

    const chat = await getMyMessages(chatId);
    return chat;
}

const chatServices = {
    getAllMyMessages,
}

export default chatServices;