import bcrypt from "bcrypt";
import createError from "http-errors";
import { User } from "../models/User.js";
import { defaultImage } from "../secret.js";
import { findUserbyEmailOrName } from "../services/userServices.js";
import { errorResponse, successResponse } from "./responseController.js";

// New user registration
const userRegester = async (req, res, next) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        // const userExists = await User.exists(email);
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({ message: `User already exists with this email ${email}` });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const imageName = req?.file?.filename;
        let imagePath = defaultImage;
        if (imageName) {
            imagePath = `/public/userImage/${imageName}`;
        }
        const userObj = {
            name,
            email,
            phoneNumber,
            password: hashPassword,
            image: imagePath,
        };

        const saveUser = await User(userObj);
        await saveUser.save();

        let user = saveUser.toJSON();
        delete user.password;

        successResponse(res, {
            statusCode: 200,
            message: "User registered successfully",
            payload: { user },
        });
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong", 
        });
    }
};

// Get all users from the database
const getAllUser = async (req, res, next) => {
    try {
        const pageSize = req?.query?.pageSize ?? "50";
        const currentPage = req?.query?.currentPage ?? "1";
        // const aggregator = paginator(currentPage, pageSize);
        // const users = await User.aggregate(aggregator);
        const usersObj = await User.find({});
        if (!usersObj) {
            errorResponse(res, {
                statusCode: 404,
                message: "No users found",
            });
        } else {
            let users = [];
            usersObj.forEach(user => {
                let usr = user.toJSON();
                delete usr.password;
                users.push(usr);
            })
            successResponse(res, {
                statusCode: 200,
                message: "User found",
                payload: { users },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

// Get a user by ID
const getAUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userObj = await User.findById(userId);
        if (!userObj) {
            errorResponse(res, {
                statusCode: 404,
                message: "User doesn't found",
            });
        } else {
            let user = userObj.toJSON();
            delete user.password;
            successResponse(res, {
                statusCode: 200,
                message: "User found",
                payload: { user },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

// Update a user Information using userId
const updateUser = async (req, res, next) => {
    try {
        const imageName = req?.file?.filename;
        let imagePath;
        if (imageName) {
            imagePath = `/public/userImage/${imageName}`;
        }

        if(!imagePath) 
            req.body.image = imagePath;

        const userObj = await User.findByIdAndUpdate(req?.params.id, req?.body, {
            new: true,
            runValidators: true,
        });
        if (!userObj) {
            errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        } else {
            let user = userObj.toJSON();
            delete user.password;
            successResponse(res, {
                statusCode: 200,
                message: "User updated successfully",
                payload: { user },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

// Delet an user from the database
const deleteUser = async (req, res, next) => {
    try {
        const userObj = await User.findByIdAndDelete(req?.params.id);
        if (!userObj) {
            errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        } else {
            let user = userObj.toJSON();
            delete user.password;
            successResponse(res, {
                statusCode: 200,
                message: "User deleted successfully",
                payload: { user },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

export {
    deleteUser,
    getAUser,
    getAllUser,
    updateUser,
    userRegester
};

