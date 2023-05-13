import request from "supertest";
import { createApp } from "@src/app.js";

describe('PUT /v1/users/:id', () => {
    let userId: string; // for storing the ID of the user created during setup
  
    beforeAll(async () => {
      // Create a user for testing
      const response = await request(createApp)
        .post('/v1/users')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword',
        });
      userId = response.body.id;
    });
  
    afterAll(async () => {
      // Delete the user created during setup
      await request(createApp).delete(`/v1/users/${userId}`);
    });
  
    // Test case for updating the user's username
    it('should update the user\'s username when provided in the request body', async () => {
      const response = await request(createApp)
        .put(`/v1/users/${userId}`)
        .attach('photo', 'test.jpg') // optional file upload using Multer
        .send({
          username: 'newusername',
        });
      expect(response.status).toBe(200);
      expect(response.body.username).toBe('newusername');
    });
  
    // Test case for updating the user's photo
    it('should update the user\'s photo when provided in the request body', async () => {
      const response = await request(createApp)
        .put(`/v1/users/${userId}`)
        .attach('photo', 'test.jpg')
        .send({
          username: 'testuser',
        });
      expect(response.status).toBe(200);
      expect(response.body.photoUrl).toBeDefined();
    });
  
    // Test case for updating both the user's username and photo
    it('should update both the user\'s username and photo when provided in the request body', async () => {
      const response = await request(createApp)
        .put(`/v1/users/${userId}`)
        .attach('photo', 'test.jpg')
        .send({
          username: 'newusername',
        });
      expect(response.status).toBe(200);
      expect(response.body.username).toBe('newusername');
      expect(response.body.photoUrl).toBeDefined();
    });
  
    // Test case for not updating the user when no attributes are provided
    it('should not update the user when no attributes are provided in the request body', async () => {
      const response = await request(createApp)
        .put(`/v1/users/${userId}`)
        .send({});
      expect(response.status).toBe(200);
      expect(response.body.username).toBe('testuser'); // username should be unchanged
    });
  
    // Test case for returning a 404 error when the user ID is invalid
    it('should return a 404 error when the user ID is invalid', async () => {
      const response = await request(createApp)
        .put('/v1/users/invalid-id')
        .attach('photo', 'test.jpg')
        .send({
          username: 'newusername',
        });
      expect(response.status).toBe(404);
    });
  });