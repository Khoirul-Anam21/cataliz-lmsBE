
import request from "supertest";
import { createApp } from "@src/app.js";
import UserFactory from "@src/modules/users/entities/user.factory.js";


describe('DELETE /v1/users/:id', () => {
    let createResult: any; // for storing the ID of the user created during setup
    let responseAuth: any;

    beforeAll(async () => {

        const userFactory = new UserFactory();
        const result = userFactory.makeOne();

        // make an accoundt
        createResult = await request(createApp)
            .post('/v1/auth/signup')
            .send({
                username: result.username,
                email: result.email,
                password: result.password,
            });

        responseAuth = await request(createApp)
            .post('/v1/auth/signin')
            .send({
                email: result.email,
                password: result.password,
            });
    });

    // Test case for deleting the user
    it('should delete the user', async () => {
        console.log(createResult);
        
        const response = await request(createApp)
        .delete(`/v1/users/${createResult.body._id}`)
        .set('Authorization', `Bearer ${responseAuth.body.accessToken}`);
        expect(response.status).toBe(204);
    });

    // Test case for returning a 404 error when the user ID is invalid
    it('should return a 404 error when the user ID is invalid', async () => {
        const response = await request(createApp)
        .delete('/v1/users/invalid-id')
        .set('Authorization', `Bearer ${responseAuth.body.accessToken}`);
        expect(response.status).toBe(404);
    });
});