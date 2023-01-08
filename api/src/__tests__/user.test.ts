import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from '../index';

import UserService from '../resources/user/user.service';

const userService = new UserService();
const App = app.express;

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'jan.doe@example.com',
    name: 'Jane',
};

const userInput = {
    email: 'test@example.com',
    name: 'Jane Doe',
    password: 'Password123'
};

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: 'PostmanRuntime/7.28.4',
    createdAt: new Date('2021-09-30T13:31:07.674Z'),
    updatedAt: new Date('2021-09-30T13:31:07.674Z'),
    __v: 0,
};

describe('user', () => {
    // user registration

    describe('user registration', () => {
        describe('given the username and password are valid', () => {
            it('should return the user payload', async () => {
                const createUserServiceMock = jest
                    .spyOn(userService, 'register')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode, body } = await supertest(App)
                    .post('/api/users/register')
                    .send(userInput);

                expect(statusCode).toBe(201);

                console.log(body);
                

                // expect(body).toEqual(userPayload);

                // expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            });
        });

        describe('given the passwords do not match', () => {
            it('should return a 400', async () => {
                const createUserServiceMock = jest
                    .spyOn(userService, 'register')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode } = await supertest(App)
                    .post('/api/users')
                    .send({
                        ...userInput,
                        passwordConfirmation: 'doesnotmatch',
                    });

                expect(statusCode).toBe(400);

                expect(createUserServiceMock).not.toHaveBeenCalled();
            });
        });

        describe('given the user service throws', () => {
            it('should return a 409 error', async () => {
                const createUserServiceMock = jest
                    .spyOn(userService, 'register')
                    .mockRejectedValueOnce('Oh no! :(');

                const { statusCode } = await supertest(App)
                    .post('/api/users')
                    .send(userInput);

                expect(statusCode).toBe(409);

                expect(createUserServiceMock).toHaveBeenCalled();
            });
        });
    });

    // describe('create user session', () => {
    //     describe('given the username and password are valid', () => {
    //         it('should return a signed accessToken & refresh token', async () => {
    //             jest.spyOn(UserService, 'validatePassword')
    //                 // @ts-ignore
    //                 .mockReturnValue(userPayload);

    //             jest.spyOn(SessionService, 'createSession')
    //                 // @ts-ignore
    //                 .mockReturnValue(sessionPayload);

    //             const req = {
    //                 get: () => {
    //                     return 'a user agent';
    //                 },
    //                 body: {
    //                     email: 'test@example.com',
    //                     password: 'Password123',
    //                 },
    //             };

    //             const send = jest.fn();

    //             const res = {
    //                 send,
    //             };

    //             // @ts-ignore
    //             await createUserSessionHandler(req, res);

    //             expect(send).toHaveBeenCalledWith({
    //                 accessToken: expect.any(String),
    //                 refreshToken: expect.any(String),
    //             });
    //         });
    //     });
    // });
});
