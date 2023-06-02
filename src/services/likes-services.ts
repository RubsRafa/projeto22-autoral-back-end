import { notFoundError, notFoundUserError } from "../errors";
import { dislike, findLikeByPost, findPostById, findUserById, like } from "../repositories";

export async function addLike(userId: number, postId: number) {
    await verifyInfo(userId, postId);

    await like(userId, postId);
    return;
}

export async function removeLike(userId: number, postId: number) {
    await verifyInfo(userId, postId)

    const likesPost = await findLikeByPost(postId);
    const like = likesPost.find((l) => {
        if(l.userId === userId) return l
    });

    await dislike(like.id);
    return;
}

async function verifyInfo(userId: number, postId: number){
    const userExist = await findUserById(userId);
    if(!userExist) throw notFoundUserError();

    const postExist = await findPostById(postId);
    if(!postExist) throw notFoundError();
    
    return;
}