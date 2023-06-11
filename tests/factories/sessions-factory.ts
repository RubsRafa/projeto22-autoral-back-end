import { prisma } from "@/config";
import { createUser } from "./authentication-factory";

export async function createSession(token: string) {
    const user = await createUser();

    return await prisma.sessions.create({
        data: {
          token: token,
          userId: user.id,
        },
      });
}