import { notFoundUserError } from "../errors";
import { findUserById, getUserDiary } from "../repositories";

export async function getUserHumor(userId: number) {
    const user = await findUserById(userId);
    if(!user) throw notFoundUserError();

    const diary = await getUserDiary(userId);
    return diary;
}

const healthService = {
    getUserDiary,
}

export default healthService;