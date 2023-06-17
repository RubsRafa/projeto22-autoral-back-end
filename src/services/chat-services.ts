import { MessagesParams } from "../protocols";
import { deleteMessage, findChatById, findUserById, getMyMessages, sendMessages } from "../repositories";
import { conflictError, notFoundError, notFoundUserError } from "../errors";

export async function getAllMyMessages(userId: number) {
    const messages = await getMyMessages();
    messages.filter((m) => (m.fromId === userId) || (m.toId === userId));
    return messages;
}

export async function addNewMessage(body: MessagesParams){
    const userExist = await findUserById(body.fromId);
    if(!userExist) throw notFoundUserError();

    const otherUserExist = await findUserById(body.toId);
    if(!otherUserExist) throw notFoundUserError();

    await sendMessages(body);
    return;
}

export async function deleteUserMessage(userId: number, messageId: number) {
    const messageExist = await findChatById(messageId);
    if(!messageExist) throw notFoundError();

    if(messageExist.fromId !== userId) throw conflictError();
    await deleteMessage(messageExist.id);
    return;
}



const chatServices = {
    getAllMyMessages,
    addNewMessage,
    deleteUserMessage,
}

export default chatServices;