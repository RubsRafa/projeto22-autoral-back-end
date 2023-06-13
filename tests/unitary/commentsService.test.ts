import { jest } from '@jest/globals';
import { returnBodyPost } from '../factories';
import likesRepository from '@/repositories/likes-repository';
import commentsService from '@/services/comments-services';
import { notFoundError } from '@/errors';

jest.mock('@/repositories/likes-repository');

describe('commentsService test suite', () => {
  describe('verifyInfo function', () => {
    it('should verify if post exist', async () => {
      const post = returnBodyPost();
      jest.spyOn(likesRepository, 'findPostById').mockResolvedValueOnce(post);

      const response = await commentsService.verifyInfo(post.id);
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(response).toEqual(undefined);
    });

    it('should throw error if post does not exist', async () => {
      const post = returnBodyPost();
      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

      await expect(commentsService.verifyInfo(post.id)).rejects.toEqual(notFoundError());

      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    });
  });
});
