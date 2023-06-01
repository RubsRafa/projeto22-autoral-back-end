import { prisma } from "../config";

export async function getAllPosts() {
    return await prisma.posts.findMany({
        include: {
            Comments: true,
            Likes: true,
            PostType: true,
            Users: true,
            Reposts: true,
        }
    })
}