import { Posts, Users } from '@prisma/client';
import { prisma } from '@/config';

export async function createRepost(user: Users, post: Posts) {
  return await prisma.reposts.create({
    data: {
      userId: user.id,
      postId: post.id,
    },
  });
}

export function bodyRepost(post: Posts) {
  return {
    postId: post.id,
  };
}
