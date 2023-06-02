import { PostParams } from "../protocols";
import { findUserById, getAllPosts, post } from "../repositories";
import { badRequestError, invalidDataError, notFoundUserError } from "../errors";


export async function getPostsService() {
    return await getAllPosts();
}

export async function postPost(userId: number, body: PostParams) {
    if(!body.text && !body.image && !body.video) throw badRequestError();
    if(body.text === '' && body.image === '' && body.video === '') throw badRequestError();
    
    const userExist = await findUserById(userId);
    if (!userExist) throw notFoundUserError();

    if(body.type === 1 && (body.text === '' || !body.text) && body.image && body.video) throw badRequestError();
    if(body.type === 2 && !body.image) throw badRequestError();
    if(body.type === 3 && !body.video) throw badRequestError();

    const myPost = await post(userExist.id, body);
    if(!myPost) throw badRequestError();

    return myPost;
}