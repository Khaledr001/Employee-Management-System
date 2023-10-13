import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../secret.js";

const createJsonWebToken = (payload, expiresIn) => {
    try {
        const token = jwt.sign(
            {
                payload,
            },
            jwtSecretKey,
            {
                expiresIn: expiresIn,
            }
        );
        return token;
    } catch (error) {
        console.log("Failed to create JWT token");
        throw new Error(error);
    }
};

export { createJsonWebToken };
