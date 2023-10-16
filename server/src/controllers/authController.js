import express from "express";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "./responseController.js";
import {User} from "../models/User.js";
import { createJsonWebToken } from "../helper/jsonWebToken.js";
import { tokenDuration } from "../secret.js";
import createError from "http-errors";

// LogIn a user
const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // user exixtence is required
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message:
                    `User does not exist with this ${email} email address. Please register fist`,
            });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return errorResponse(res, {
                statusCode: 401,
                message: "User password does not match",
            });
        }

        req.user = user;

        const usr = user.toJSON();
        delete usr.password;
        // Create token and save in http-cookie
        const accessToken = createJsonWebToken(usr, tokenDuration);
        // res.header('accessToken', accessToken);
        // res.header('emasgsil', email);

        // const cookieOptions = {
        //     maxAge: 2 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,

        //     sameSite: "none",
        // };

        // res.cookie('accessToken', accessToken, cookieOptions);
        // console.log(accessToken);
        console.log(usr);

        // const accessToke = req.cookies.accessToken;
        console.log("Login successful");
        // res.status(200).json(user);
        // Login user successfully 
        successResponse(res, {
            statusCode: 200,
            message: "Login successful",
            payload: {
                user,
                accessToken,
            },
        });
    } catch (error) {
        createError(500, "Something went wrong");
    }
};

const handleLogOut = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");

        // Login user successfully
        successResponse(res, {
            statusCode: 200,
            message: "Logout successful",
            payload: {},
        });
    } catch (error) {
        createError(500, "Something went wrong");
    }
};

export { handleLogin, handleLogOut };
