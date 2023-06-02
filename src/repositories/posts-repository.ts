import { PostParams } from "@/protocols";
import { prisma } from "../config";

export async function getAllPosts() {
    return await prisma.posts.findMany({
        include: {
            PostType: true,
            Users: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    birthday: true,
                },
            },
            Likes: {
                select: {
                    Users: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            birthday: true,
                        },
                    },
                    id: true,
                    postId: true,
                }
            },
            Comments: {
                select: {
                    id: true,
                    postId: true,
                    createdAt: true,
                    updatedAt: true,
                    Users: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                },
            },
            Reposts: {
                select: {
                    id: true,
                    postId: true,
                    createdAt: true,
                    updatedAt: true,
                    Users: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            }
        }
    })
}

export async function post(userId: number, body: PostParams) {
    return await prisma.posts.create({
        data: {
            userId: userId,
            type: body.type,
            text: body.text,
            image: body.image,
            video: body.video,
        }
    })
}