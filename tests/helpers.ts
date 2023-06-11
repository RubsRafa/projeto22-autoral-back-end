import * as jwt from 'jsonwebtoken';
import { prisma } from '@/config';
import { Users } from '@prisma/client';

export async function cleanDb() {
    await prisma.comments.deleteMany({});
    await prisma.follows.deleteMany({});
    await prisma.likes.deleteMany({});
    await prisma.reposts.deleteMany({});
    await prisma.sessions.deleteMany({});
    await prisma.posts.deleteMany({});
    await prisma.users.deleteMany({});
}

// export async function generateValidToken(user?: Users) {
//     const incomingUser = user || ()
// }