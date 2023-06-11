import app, { init } from "@/app"
import { cleanDb, generateValidToken } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createComment, createPost, createUser } from "../factories";
import * as jwt from 'jsonwebtoken';

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('GET /comment', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get(`/comment`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get(`/comment`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get(`/comment`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe('when token is valid', () => {
        it('should respond with status 200 and empty array if has no comments', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get('/comment').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual([]);
        })
        it('should respond with status 200 and array with comments', async () => {
            const user = await createUser();
            const otherUser = await createUser();
            const token = await generateValidToken(user);
            const post = await createPost(otherUser, 1);
            const comment = await createComment(user, post);

            const response = await server.get('/comment').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual([
                expect.objectContaining({
                    id: comment.id,
                    comment: comment.comment,
                    userId: user.id,
                    postId: post.id,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    Users: {
                        id: user.id,
                        name: user.name,
                        image: user.image
                    }
                })
            ]);
        })
    })
})