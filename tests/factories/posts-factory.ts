import { faker } from '@faker-js/faker';
import { Posts, Users } from '@prisma/client';
import { prisma } from '@/config';

export async function createPost(user: Users, type: number) {
  return await prisma.posts.create({
    data: {
      userId: user.id,
      type,
      text: faker.word.words(),
    },
  });
}

export function bodyPost(type: number) {
  return {
    type,
    text: faker.word.words(),
  };
}

export function bodyPostWithNoText(type: number) {
  return {
    type,
    image: faker.image.avatar(),
    video: faker.image.url(),
  };
}

export function bodyPostWithTextEmpty(type: number) {
  return {
    type,
    texy: '',
    image: faker.image.avatar(),
    video: faker.image.url(),
  };
}

export function bodyEmpty(type: number) {
  return {
    type,
    texy: '',
    image: '',
    video: '',
  };
}

export function postWithNothing(type: number) {
  return {
    type,
  };
}

export async function deletePost(post: Posts) {
  await prisma.comments.deleteMany({});
  return await prisma.posts.delete({
    where: {
      id: post.id,
    },
  });
}
