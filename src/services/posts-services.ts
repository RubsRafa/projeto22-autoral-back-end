import { PostParams } from '../protocols';
import {
  findUserById,
  getAllPosts,
  getAllReposts,
  getAllUserReposts,
  getAllUserPosts,
  post,
  getAllFollows,
  findPostById,
  deletePost,
} from '../repositories';
import { badRequestError, conflictError, notFoundUserError } from '../errors';

export async function getPostsService(userId: number) {
  const posts = await getAllPosts();
  const reposts = await getAllReposts();

  const allInfo = [];

  for (let i = 0; i < reposts.length; i++) {
    const repost = reposts[i];

    for (let x = 0; x < posts.length; x++) {
      const post = posts[x];
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
        });
      }
    }
  }
  
  const results = allInfo.concat(posts);

  const myFollows = await getAllFollows(userId);
  const filterPostsFromFollows = [];

  if (myFollows.length === 0) {
    for (let i = 0; i < results.length; i++) {
      const post = results[i];
      if (post.userId === userId || (post.isReposted && post.repostedById === userId)) {
        filterPostsFromFollows.push(post);
      }
    }
  } else {
    for (let i = 0; i < myFollows.length; i++) {
      const follows = myFollows[i];

      for (let x = 0; x < results.length; x++) {
        const post = results[x];
        if (
          post.userId === follows.userIdIFollow ||
          (post.userId === userId && !post.isReposted) ||
          (post.isReposted && post.repostedById === userId) ||
          (post.isReposted && post.repostedById === follows.userIdIFollow)
        ) {
          filterPostsFromFollows.push(post);
        }
      }
    }
  }

  filterPostsFromFollows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return filterPostsFromFollows;
}

export async function postPost(userId: number, body: PostParams) {
  if (!body.text && !body.image && !body.video) throw badRequestError();
  if (body.text === '' && body.image === '' && body.video === '') throw badRequestError();

  const userExist = await findUserById(userId);

  if (body.type === 1 && (body.text === '' || !body.text) && body.image && body.video) throw badRequestError();
  if (body.type === 2 && !body.image) throw badRequestError();
  if (body.type === 3 && !body.video) throw badRequestError();

  const myPost = await post(userExist.id, body);

  return myPost;
}

export async function getUserAllPosts(userId: number) {
  const userExist = await findUserById(userId);
  if (!userExist) throw notFoundUserError();

  const userPosts = await getAllUserPosts(userId);
  const userReposts = await getAllUserReposts(userId);

  const allUserInfo = [];

  for (let i = 0; i < userReposts.length; i++) {
    const repost = userReposts[i];

    for (let x = 0; x < userPosts.length; x++) {
      const post = userPosts[x];
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
        });
      }
    }
  }

  const results = allUserInfo.concat(userPosts);
  results.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return results;
}

export async function deletePostService(userId: number, postId: number) {
  const post = await findPostById(postId);
  if(!post) throw conflictError();

  if(post.userId !== userId) throw conflictError();
  await deletePost(postId);
  return;
}

const postsService = {
  getPostsService,
  postPost,
  getUserAllPosts,
  deletePostService,
};

export default postsService;
