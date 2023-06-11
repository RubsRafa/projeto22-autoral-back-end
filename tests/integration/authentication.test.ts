import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '@/app';
import { cleanDb } from '../helpers';
import { createUser, invalidBody, returnUserBody } from '../factories';


beforeAll(async() => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /auth/signup', () => {
    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/auth/signup');
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    
      it('should respond with status 400 when body is not valid', async () => {
        const user = invalidBody();
    
        const response = await server.post('/auth/signup').send(user);
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });



    it('should respond with status 401 if email already exists', async () => {
        const user = await createUser();
        const newUser = returnUserBody(user.email);

        const response = await server.post('/auth/signup').send(newUser);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })
})
