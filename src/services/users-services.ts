import { notFoundUserError } from "../errors";
import { findUserById, getUserInfo } from "../repositories";

export async function getUserInfoService(userId: number) {
    const userExist = await findUserById(userId);
    if(!userExist) throw notFoundUserError();

    const userInfo = await getUserInfo(userId);;
    return userInfo
}