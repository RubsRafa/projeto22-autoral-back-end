import { UserType } from '@/protocols';
import { prisma } from '../config';

export async function findSession(token: string) {
  return await prisma.sessions.findFirst({
    where: {
      token,
    },
  });
}

export async function findUserEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}

export async function singUp(user: UserType, hashedPassword: string) {
  return await prisma.users.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      image: user.image,
      birthday: user.birthday,
    }
  })
}