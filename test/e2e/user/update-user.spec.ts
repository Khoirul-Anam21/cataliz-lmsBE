import request from "supertest";
import { createApp } from "@src/app.js";
import { CreateResultInterface } from "@src/database/connection";
import UserFactory from "@src/modules/users/entities/user.factory.js";

describe('PUT /v1/users/:id', () => {
    let createResult: CreateResultInterface; // for storing the ID of the user created during setup
    let userFactory: UserFactory;
    let signInResponse: any;
    beforeAll(async () => {

        userFactory = new UserFactory();
        createResult = await userFactory.create()
        signInResponse = await request(createApp)
            .post('/v1/auth/signin')
            .send({
                email: userFactory.definition().email,
                password: userFactory.definition().password,
            });
        console.log(userFactory.definition());
        
    });

    afterAll(async () => {
        // Delete the user created during setup
        await request(createApp).delete(`/v1/users/${createResult._id}`);
    });

    // Test case for updating the user's username
    it('should update the user\'s username when provided in the request body', async () => {
        console.log(createResult);

        const response = await request(createApp)
            .put(`/v1/users/${createResult._id}`)
            .set('Authorization', `Bearer ${signInResponse}`)
            .send({
                username: 'newusername',
            });
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('newusername');
    });

    // Test case for updating the user's photo
    it('should update the user\'s photo when provided in the request body', async () => {
        const response = await request(createApp)
            .put(`/v1/users/${createResult._id}`)
            .set('Authorization', `Bearer ${signInResponse}`)
            .attach('photo', '../test-assets/flying-cat.png')
            .send({
                username: 'testuser',
            });
        expect(response.status).toBe(200);
        expect(response.body.photoUrl).toBeDefined();
    });

    // Test case for updating both the user's username and photo
    it('should update both the user\'s username and photo when provided in the request body', async () => {
        const response = await request(createApp)
            .put(`/v1/users/${createResult._id}`)
            .set('Authorization', `Bearer ${signInResponse}`)
            .attach('photo', '../test-assets/flying-cat.png')
            .send({
                username: 'newusername',
            });
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('newusername');
        expect(response.body.photoUrl).toBeDefined();
    });

    // Test case for returning a 404 error when the user ID is invalid
    it('should return a 404 error when the user ID is invalid', async () => {
        const response = await request(createApp)
            .put('/v1/users/invalid-id')
            .set('Authorization', `Bearer ${signInResponse}`)
            .attach('photo', '../test-assets/flying-cat.png')
            .send({
                username: 'newusername',
            });
        expect(response.status).toBe(404);
    });
});