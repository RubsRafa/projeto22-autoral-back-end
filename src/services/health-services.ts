import { HealthParams } from "../protocols";
import { conflictError } from "../errors";
import { addHumor, changeHumor, findHumorDiary, getUserDiary } from "../repositories";

export async function getUserHumor(userId: number) {
    const diary = await getUserDiary(userId);
    return diary;
}

export async function postHumor(userId: number, text: string, color: string, mood: number) {
    await addHumor(userId, text, color, mood);
    return;
}

export async function putHumor(body: HealthParams) {

    const humor = await findHumorDiary(body.id);
    if(!humor) throw conflictError();

    await changeHumor(body);
    return;
}

const healthService = {
    getUserDiary,
    postHumor,
    putHumor,
}

export default healthService;