import authenticantionRepository from '@/repositories/authentication-repository';
import { jest } from '@jest/globals';

describe('authService test suite', () => {
    describe('createUser function', () => {
        it('should not allow user creation with an email in use', () => {
            jest.spyOn(authenticantionRepository, 'singUp').mockImplementationOnce((): any => {
                return
            })
        })
    })
})