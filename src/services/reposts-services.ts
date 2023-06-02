import { notFoundError, notFoundUserError } from "../errors";
import { findPostById, findRepostIdByPostId, findUserById, post, removeRepost, repost } from "../repositories";

export async function addRepostService(userId: number, postId: number) {
    await verifyInfo(userId, postId);

    await repost(userId, postId);
    return;
}

export async function removeRepostService(userId: number, postId: number) {
    await verifyInfo(userId, postId);

    const repostsPost = await findRepostIdByPostId(postId);
    const repost = repostsPost.find((r) => {
        if(r.userId === userId) return r;
    });

    await removeRepost(repost.id);
}

async function verifyInfo(userId: number, postId: number){
    const userExist = await findUserById(userId);
    if(!userExist) throw notFoundUserError();

    const postExist = await findPostById(postId);
    if(!postExist) throw notFoundError();
    
    return;
}