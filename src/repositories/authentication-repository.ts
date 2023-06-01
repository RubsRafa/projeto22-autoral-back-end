import { prisma } from '../config';

export async function findSession(token: string) {
  return await prisma.sessions.findFirst({
    where: {
      token,
    },
  });
}
