import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { UserRepository } from "../repositories/user.repository.js";
import { UserInterface } from "./user.entity";
import { CreateResultInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export default class UserFactory extends Factory<UserInterface>{
    definition(): UserInterface {
        return {
            username: faker.name.fullName(),
            email: faker.name.firstName() + faker.name.lastName() + "@gmail.com",
            password: "qwertyuiop",
            photo: "",
            job: "",
            role: "student"
        }
    }
    
    async create(): Promise<CreateResultInterface> {
        const userRepository = new UserRepository(db);
        const result = await userRepository.create(this.makeOne());
        return result;
    }
    async createMany(count: number): Promise<unknown> {
        const userRepository = new UserRepository(db);
        const result = await userRepository.create(this.makeMany(count));
        return result;
    }

}

export class UserFacilitatorFactory extends Factory<UserInterface>{
    definition(): UserInterface {
        return {
            username: faker.name.fullName(),
            email: faker.name.firstName() + faker.name.lastName() + "@gmail.com",
            password: "qwertyuiop",
            photo: "",
            job: "",
            role: "facilitator"
        }
    }
    
    async create(): Promise<unknown> {
        const userRepository = new UserRepository(db);
        const result = await userRepository.create(this.makeOne());
        return result;
    }
    async createMany(count: number): Promise<unknown> {
        const userRepository = new UserRepository(db);
        const result = await userRepository.create(this.makeMany(count));
        return result;
    }

}