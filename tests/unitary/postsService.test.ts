import postsRepository from '@/repositories/posts-repository';
import repostsRepository from '@/repositories/reposts-repository';
import postsService from '@/services/posts-services';
import { jest } from '@jest/globals';
import { returnFollows, returnGetPosts, returnGetReposts, returnReposts, returnUserBody, returnUserExist } from '../factories';
import followsRepository from '@/repositories/follows-repository';

jest.mock('@/repositories/posts-repository');
jest.mock('@/repositories/reposts-repository');
jest.mock('@/repositories/follows-repository');

describe('postsService test suite', () => {
    describe('getPostsService function', () => {
        it('should return filtered and sorted posts', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const post = returnGetPosts(otherUser);
            const posts = [post];
            const repost = returnReposts(otherUser, post);
            const reposts = [repost];
            const repostAsPost = returnGetReposts(post, repost);
            const repostsToConcat = [repostAsPost];
            const follow = returnFollows(user, otherUser);
            const follows = [follow];

            const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
            const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
            jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows)
       
            const response = await postsService.getPostsService(user.id);
            const result = posts.concat(repostsToConcat);
            result.sort((a,b) => b.updatedAt.getTime() - a.updatedAt.getTime());

            console.log(response);
       
            expect(getAllPostsMock).toHaveBeenCalled();
            expect(getAllRepostsMock).toHaveBeenCalled();
            expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id)
            expect(response).toEqual(result);
          });

          it('should return no post if user does not follow anyone', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const post = returnGetPosts(otherUser);
            const posts = [post];
            const repost = returnReposts(otherUser, post);
            const reposts = [repost];

            const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
            const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
            jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(undefined)
       
            const response = await postsService.getPostsService(user.id);

            console.log(response);
       
            expect(getAllPostsMock).toHaveBeenCalled();
            expect(getAllRepostsMock).toHaveBeenCalled();
            expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id)
            expect(response).toEqual([]);
          });
    })
})