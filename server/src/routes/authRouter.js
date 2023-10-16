import express from 'express';
import { handleLogin, handleLogOut } from '../controllers/authController.js';
import { isLoggedOut, isLoggedIn } from '../middlewares/auth.js';


const authRouter = express.Router();


authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogOut);


export { authRouter };