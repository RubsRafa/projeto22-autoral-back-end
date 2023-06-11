import { notFoundError, notFoundUserError } from "../errors";
import { FollowParams } from "../protocols";
import { createFollow, findFollow, findUserById, getAllFollows, getAllUsers, removeFollow } from "../repositories";

export async function findMyFollows(userId: number) {
    const myFollows = await getAllFollows(userId);
    const allUsers = await getAllUsers();

    const results: FollowParams[] = [];
    for (let i = 0; i < myFollows.length; i++) {
        let follow = myFollows[i];

        for (let x = 0; x < allUsers.length; x++) {
            let user = allUsers[x];

            if (user.id === follow.userIdIFollow) {
                results.push({
                    id: follow.id,
                    userId: follow.userId,
                    userIdIFollow: follow.userIdIFollow,
                    userName: user.name,
                    userImage: user.image,
                })
            }
        }
    }

    return results;
}

export async function followUser(userId: number, userIdIFollow: number) {
    const existUser = await findUserById(userId);
    if(!existUser) throw notFoundUserError();

    const existUserFollowed = await findUserById(userIdIFollow);
    if(!existUserFollowed) throw notFoundUserError();

    await createFollow(userId, userIdIFollow);
    return;
}

export async function removeFollowService(userId: number, followId: number) {
    const existUser = await findUserById(userId);
    if(!existUser) throw notFoundUserError();

    const followExist = await findFollow(followId);
    if(!followExist) throw notFoundError();

    await removeFollow(followId);
    return;
}