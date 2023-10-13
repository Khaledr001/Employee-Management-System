import { validationResult } from "express-validator";
import createError from 'http-errors';
import { errorResponse } from "../controllers/responseController.js";

const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            errorResponse(res, {
                statusCode: 422,
                message: errors.array(),
            });
        }
        return next();
    } catch (error) {
        createError(500, "Something went wrong");
    }
};

export { runValidation };
