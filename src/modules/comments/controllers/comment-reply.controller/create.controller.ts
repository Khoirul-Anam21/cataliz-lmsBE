import { NextFunction, Request, Response } from "express";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try{

        // res.status(201).json({
        //     id: result.id,
        //     acknowledged: result.acknowledged,
        // });
    } catch (error) {
        next(error);
    }
};