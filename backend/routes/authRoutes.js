import express from 'express';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/login", authController.handleLogIn)

authRouter.post("/signup", authController.handleSignUp)

export default authRouter;