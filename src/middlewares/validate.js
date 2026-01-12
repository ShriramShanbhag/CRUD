import AppError from "../errors/AppError.js"
import { ZodError } from "zod";

export const validate = (schema) =>  (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        if(error instanceof ZodError) {
            return  next(
                new AppError("Invalid request data", 400, {
                errors: error.issues.map(e => ({
                  field: e.path.join("."),
                  message: e.message,
                }))
            }));
        }
        next(new AppError("Invalid request data", 400));        
    }
}