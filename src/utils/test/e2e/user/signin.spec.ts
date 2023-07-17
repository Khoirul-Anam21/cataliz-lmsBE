import request from "supertest";
import { createApp } from "@src/app.js";


describe('POST /v1/auth/signin', () => {
  
    // Test case for successful login
    it('should successfully login with valid credentials', async () => {
      const response = await request(createApp)
        .post('/v1/auth/signin')
        .send({
          "email": "rofiq.muslikh@gmail.com",
          "password": "qwertyuiop"
        });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  
    // Test case for invalid email
    it('should return an error for an invalid email', async () => {
      const response = await request(createApp)
        .post('/v1/auth/signin')
        .send({
          "email": "InvalidEmail",
          "password": "qwertyuiop"
        });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid email or password');
    });
  
    // Test case for invalid password
    it('should return an error for an invalid password', async () => {
      const response = await request(createApp)
        .post('/v1/auth/signin')
        .send({
          "email": "rofiq.muslikh@gmail.com",
          "password": "InvalidPassword"
        });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid email or password');
    });
  
    // Test case for missing email
    it('should return an error for a missing email', async () => {
      const response = await request(createApp)
        .post('/v1/auth/signin')
        .send({
          "password": "qwertyuiop"
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Username is required');
    });
  
    // Test case for missing password
    it('should return an error for a missing password', async () => {
      const response = await request(createApp)
        .post('/v1/auth/signin')
        .send({
          "email": "Rofiqul"
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password is required');
    });
  
  });