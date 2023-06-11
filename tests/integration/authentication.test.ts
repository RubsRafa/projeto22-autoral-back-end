import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '@/app';
import { cleanDb } from '../helpers';
import { createUser, returnUserBody } from '../factories';


beforeAll(async() => {
    await init();
});

beforeEach(async() => {
    await cleanDb();
})

const server = supertest(app);

describe('POST /auth/signup', () => {
    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/auth/signup');
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    
    it('should respond with status 400 when body is not valid', async () => {
        const user = {};
    
        const response = await server.post('/auth/signup').send(user);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

    it('should respond with status 401 if email already exists', async () => {
        const user = await createUser();
        const newUser = returnUserBody(user.email);

        const response = await server.post('/auth/signup').send(newUser);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it('should respond with status 400 when body is not valid', async () => {
        const user = {};
    
        const response = await server.post('/auth/signup').send(user);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

      it('should respond with status 201 when body is valid', async () => {
        const user = returnUserBody();
    
        const response = await server.post('/auth/signup').send(user);
        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.text).toBe('User created successfully!');
      });

})

// describe('POST /auth/signin', () => {
//     it('should respond with')
// })