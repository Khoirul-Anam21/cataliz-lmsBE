
import request from "supertest";
import { createApp } from "@src/app.js";
import UserFactory from "@src/modules/users/entities/user.factory";


describe('DELETE /v1/users/:id', () => {
    let userId: string; // for storing the ID of the user created during setup

    beforeAll(async () => {

        const userFactory = new UserFactory();
        const result = await userFactory.create()
        // Create a user for testing
        userId = result._id;
    });

    // Test case for deleting the user
    it('should delete the user', async () => {
        const response = await request(createApp).delete(`/v1/users/${userId}`);
        expect(response.status).toBe(204);
    });

    // Test case for returning a 404 error when the user ID is invalid
    it('should return a 404 error when the user ID is invalid', async () => {
        const response = await request(createApp).delete('/v1/users/invalid-id');
        expect(response.status).toBe(404);
    });
});