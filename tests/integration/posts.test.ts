import app, { init } from "@/app"
import { cleanDb, generateValidToken } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createFollow, createPost, createPostType, createUser } from "../factories";
import * as jwt from "jsonwebtoken";

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('GET /posts', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/posts');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe('when token is valid', () => {
        it('should respond with status 200 and empty array if user has no posts and no followers', async() => {
            const user = await createUser();
            const token = await generateValidToken(user)

            const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([]);
        });
        it('should respond with status 200 and post made by user', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const postType = await createPostType();
            const post = await createPost(user ,postType.id);

            const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual([
                expect.objectContaining({
                id: post.id,
                userId: user.id,
                type: postType.id,
                video: null,
                image: null,
                text: post.text,
                isReposted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                PostType : {
                    id: postType.id,
                    type: postType.type
                },
                Users: {
                    id: user.id,
                    name: user.name,
                    image: user.image,
                    birthday: user.birthday,
                },
                Likes: [],
                Comments: [],
                Reposts: [],
                repostedById: null,
                repostedByName: null,
                repostedByImage: null
            })])

        })
        it('should respond with status 200 and post from follower', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const userIFollow = await createUser();
            await createFollow(user, userIFollow);
            const postType = await createPostType();
            const post = await createPost(userIFollow ,postType.id);

            const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual([
                expect.objectContaining({
                id: post.id,
                userId: userIFollow.id,
                type: postType.id,
                video: null,
                image: null,
                text: post.text,
                isReposted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                PostType : {
                    id: postType.id,
                    type: postType.type
                },
                Users: {
                    id: userIFollow.id,
                    name: userIFollow.name,
                    image: userIFollow.image,
                    birthday: userIFollow.birthday,
                },
                Likes: [],
                Comments: [],
                Reposts: [],
                repostedById: null,
                repostedByName: null,
                repostedByImage: null
            })])

        })
    })
})