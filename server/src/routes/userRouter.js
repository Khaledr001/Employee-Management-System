import express from "express";
import {
    deleteUser,
    getAUser,
    getAllUser,
    updateUser,
    userRegester
} from "../controllers/userController.js";
import { validateUserRegistration } from "../validation/userValidation.js";

import { isLoggedOut } from "../middlewares/auth.js";
import { upload } from "../middlewares/imageUpload.js";
import { runValidation } from "../validation/checkValidation.js";

const userRouter = express.Router();

userRouter.get('/test', (req, res) => { 
    res.status(200).json({message: "hello!"});
})

userRouter.post(
    "/register",
    isLoggedOut,
    upload.single("image"),
    validateUserRegistration,
    runValidation,
    userRegester
);

userRouter.get("/allusers",  getAllUser);

userRouter.get("/:id",  getAUser);

userRouter.put("/update/:id", upload.single("image"),  updateUser);

userRouter.delete("/delete/:id",  deleteUser);

export { userRouter };
