import { PostParams } from "../protocols";
import { findUserById, getAllPosts, getAllReposts, getAllUserReposts, getAllUserPosts, post } from "../repositories";
import { badRequestError, notFoundUserError } from "../errors";


export async function getPostsService() {
    const posts = await getAllPosts();
    const reposts = await getAllReposts();

    const allInfo = [];

    for (let i = 0; i < reposts.length; i++) {
        let repost = reposts[i];

        for (let x = 0; x < posts.length; x++) {
            let post = posts[x];
            if (post.id === repost.postId) {
                allInfo.push({
                    id: post.id,
                    userId: post.Users.id,
                    type: post.PostType.id,
                    video: post.video,
                    image: post.image,
                    text: post.text,
                    isReposted: true,
                    createdAt: repost.createdAt,
                    updatedAt: repost.updatedAt,
                    PostType: post.PostType,
                    Users: post.Users,
                    Likes: post.Likes,
                    Comments: post.Comments,
                    Reposts: post.Reposts,
                    repostedById: repost.userId,
                    repostedByName: repost.Users.name,
                    repostedByImage: repost.Users.image,
                })
            }
        }
    }

    const results = allInfo.concat(posts)
    results.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return results;
}

export async function postPost(userId: number, body: PostParams) {
    if (!body.text && !body.image && !body.video) throw badRequestError();
    if (body.text === '' && body.image === '' && body.video === '') throw badRequestError();

    const userExist = await findUserById(userId);
    if (!userExist) throw notFoundUserError();

    if (body.type === 1 && (body.text === '' || !body.text) && body.image && body.video) throw badRequestError();
    if (body.type === 2 && !body.image) throw badRequestError();
    if (body.type === 3 && !body.video) throw badRequestError();

    const myPost = await post(userExist.id, body);
    if (!myPost) throw badRequestError();

    return myPost;
}

export async function getUserAllPosts(userId: number) {
    const userExist = await findUserById(userId);
    if(!userExist) throw notFoundUserError();

    const userPosts = await getAllUserPosts(userId);
    const userReposts = await getAllUserReposts(userId);

    const allUserInfo = [];

    for (let i = 0; i < userReposts.length; i++) {
        let repost = userReposts[i];

        for (let x = 0; x < userPosts.length; x++) {
            let post = userPosts[x];
            if (post.id === repost.postId) {
                allUserInfo.push({
                    id: post.id,
                    userId: post.Users.id,
                    type: post.PostType.id,
                    video: post.video,
                    image: post.image,
                    text: post.text,
                    isReposted: true,
                    createdAt: repost.createdAt,
                    updatedAt: repost.updatedAt,
                    PostType: post.PostType,
                    Users: post.Users,
                    Likes: post.Likes,
                    Comments: post.Comments,
                    Reposts: post.Reposts,
                    repostedById: repost.userId,
                    repostedByName: repost.Users.name,
                    repostedByImage: repost.Users.image,
                })
            }
        }
    }

    const results = allUserInfo.concat(userPosts)
    results.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return results;
}