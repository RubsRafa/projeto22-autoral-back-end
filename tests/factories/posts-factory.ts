import { faker } from '@faker-js/faker';
import { Posts, Users } from '@prisma/client';
import { prisma } from '@/config';
import { PostsReturn } from '@/protocols';

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

export function returnBodyPost(): Posts {
  return {
    id: faker.number.int(),
    userId: faker.number.int(),
    type: faker.number.int(),
    video: faker.internet.ipv4(),
    image: faker.internet.avatar(),
    text: faker.word.words(),
    isReposted: true,
    repostedById: null,
    repostedByName: null,
    repostedByImage: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }
}

export function returnGetPosts(otherUser: Users): PostsReturn {
  return {
    id: faker.number.int({ max: 50 }),
    userId: otherUser.id,
    type: 1,
    video: faker.internet.ipv4(),
    image: faker.internet.avatar(),
    text: faker.word.words(),
    isReposted: false,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    PostType: {
      id: 1,
      type: faker.word.noun(),
    },
    Users: {
      id: otherUser.id,
      name: faker.internet.displayName(),
      image: faker.internet.avatar(),
      birthday: faker.date.anytime()
    },
    Likes: [
      {
        Users: {
          id: faker.number.int({ max: 50 }),
          name: faker.internet.displayName(),
          image: faker.internet.avatar(),
          birthday: faker.date.anytime()
        },
        id: faker.number.int({ max: 50 }),
        postId: faker.number.int({ max: 50 }),
        userId: faker.number.int({ max: 50 })
      }
    ],
    Comments: [
      {
        id: faker.number.int({ max: 50 }),
        postId: faker.number.int({ max: 50 }),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        comment: faker.word.words(),
        Users: {
          id: faker.number.int({ max: 50 }),
          name: faker.internet.displayName(),
          image: faker.internet.avatar()
        }
      }
    ],
    Reposts: [
      {
        id: faker.number.int({ max: 50 }),
        postId: faker.number.int({ max: 50 }),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        Users: {
          id: otherUser.id,
          name: faker.internet.displayName(),
          image: faker.internet.avatar(),
        }
      }
    ],
    repostedById: otherUser.id,
    repostedByName: otherUser.name,
    repostedByImage: otherUser.image,
  }
}