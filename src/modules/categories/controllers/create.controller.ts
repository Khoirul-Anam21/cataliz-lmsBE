import { NextFunction, Request, Response } from "express";
import { CreateCategoryService } from "../services/create.service.js";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const createCategoryService = new CreateCategoryService(db);

        const result = await createCategoryService.handle(
            req.body.name,
        );

        res.status(201).json({
            id: result.id,
            acknowledged: result.acknowledged,
        });
    } catch (error) {
        next(error);
    }
};