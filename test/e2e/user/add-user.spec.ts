import request from "supertest";
import { createApp } from "@src/app.js";
import UserFactory from "@src/modules/users/entities/user.factory";
import { UserRepository } from "@src/modules/users/repositories/user.repository";

describe("Add user/Sign-up", () => {
  // invalid email format --V
  // should check required fields
  // should respond with id / saved to database
  it("Should return error if the email is invalid", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/auth/signup").send({
      username: "budsdf",
      email: "budirock.com",
      password: "qwertyuiop"
    })
    expect(response.statusCode).toEqual(422);
    expect(response.body.code).toEqual(422);
    expect(response.body.status).toEqual("Unprocessable Entity");
    expect(response.body.message).toEqual(
      "The request was well-formed but was unable to be followed due to semantic errors."
    );
  })
  it("should check required fields", async () => {
    const app = await createApp();

    const response = await request(app).post("/v1/auth/signup").send({
      username: "anam",
      password: "qwertyiops"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.code).toEqual(422);
    expect(response.body.status).toEqual("Unprocessable Entity");
    expect(response.body.message).toEqual(
      "The request was well-formed but was unable to be followed due to semantic errors."
    );
    expect(response.body.errors.email).toEqual(["The email field is required."]);
  });
  it("should save to database", async () => {
    const app = await createApp();
    const email = "tester@example.com";
    const response = await request(app).post("/v1/auth/signup").send({
      username: "anam",
      email,
      password: "qwertyuiop"
    });

    // TODO: Akses repo database

    expect(response.statusCode).toEqual(201);
    expect(response.body._id).not.toBeNull();
  });
})