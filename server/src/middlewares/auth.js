import createError from "http-errors";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../secret.js";

const isLoggedIn = async (req, res, next) => {
    try {
        // looking for access token
        // const accessToken = req.header("Authorization");
        let accessToken = req.cookies.accessToken;
        // console.log(accessToken);
        if (!accessToken) {
            accessToken = req.headers.authorization;
            // console.log(accessToken);
            if (!accessToken) {
                console.log("user not login");
                throw createError(401, "Access token not found please log in");
            }
        }
        // verifying token
        const decoded = jwt.verify(accessToken, jwtSecretKey);
        if (!decoded) {
            console.log("Access token is not valid");
            throw createError(401, "Invalid access token please login again");
        }
        req.user = decoded.payload;
        console.log("user already logged in");

        next();
    } catch (error) {
        return next(error);
    }
};

const isLoggedOut = async (req, res, next) => {
    try {
        // looking for access token
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            throw createError(400, "User already logged in");
        }
        next();
    } catch (error) {
        return next(error);
    }
};

// const isAdmin = async (req, res, next) => {
//     try {
//         const user = req?.user;
//         console.log(user);
//         if (user && user.role == "admin") {
//             next();
//         } else {
//             throw createError(403, "You are not admin to access this page");
//         }
//     } catch (error) {
//         return next(error);
//     }
// };

export { isLoggedIn, isLoggedOut };
