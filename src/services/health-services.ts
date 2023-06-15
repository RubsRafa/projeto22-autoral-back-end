import { notFoundUserError } from "../errors";
import { addHumor, findUserById, getUserDiary } from "../repositories";

export async function getUserHumor(userId: number) {
    const user = await findUserById(userId);
    if(!user) throw notFoundUserError();

    const diary = await getUserDiary(userId);
    return diary;
}

export async function postHumor(userId: number, text: string, color: string, mood: number) {
    const user = await findUserById(userId);
    if(!user) throw notFoundUserError();

    await addHumor(userId, text, color, mood);
    return;
}

const healthService = {
    getUserDiary,
    postHumor,
}

export default healthService;