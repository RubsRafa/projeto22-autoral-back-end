import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { getPosts, getUserPosts, postAPost } from '../controllers';
import { postsSchema } from '../schemas';

const postsRouter = Router();

postsRouter
  .all('/*', authenticateToken)
  .get('/', getPosts)
  .get('/user/:userId', getUserPosts)
  .post('/', validateBody(postsSchema), postAPost);

export { postsRouter };
