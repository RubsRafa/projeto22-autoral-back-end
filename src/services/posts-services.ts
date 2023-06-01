import { getAllPosts } from "../repositories";


export async function getPostsService() {
    return await getAllPosts();
}