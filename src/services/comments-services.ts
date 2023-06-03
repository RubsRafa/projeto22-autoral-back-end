import { notFoundError, notFoundUserError } from "../errors";
import { addComment, findComment, findPostById, findUserById, getAllComments, removeComment } from "../repositories";

export async function addCommentService(userId: number, postId: number, comment: string) {
    await verifyInfo(userId, postId);

    await addComment(userId, postId, comment);
    return;
}

export async function removeCommentService(userId: number, commentId: number) {

    const commentPost = await findComment(commentId);

    verifyInfo(userId, commentPost.postId);

    await removeComment(commentId);
    return;
}

async function verifyInfo(userId: number, postId: number){
    const userExist = await findUserById(userId);
    if(!userExist) throw notFoundUserError();

    const postExist = await findPostById(postId);
    if(!postExist) throw notFoundError();
    
    return;
}

export async function getComments () {
    const comments = await getAllComments();
    return comments;
}