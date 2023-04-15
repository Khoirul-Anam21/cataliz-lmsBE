import { CategoryRepository } from "../repositories/category.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateCategoryService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(name: string,) {
        const categoryRepository = new CategoryRepository(this.db);
        const result = await categoryRepository.create({
            name,
        })
        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}