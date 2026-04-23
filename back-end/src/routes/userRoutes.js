import express from 'express';
import { body } from "express-validator";
import { registerUser, login } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/user/register',
    body('name').isString().notEmpty().escape(),
    body('email').isEmail().notEmpty().escape(),
    body('password').isLength({ min: 6 }).notEmpty().escape(),
    registerUser);
userRouter.post('/user/login',
    body('email').isEmail().notEmpty().escape(),
    body('password').isLength({ min: 6 }).notEmpty().escape(),
    login);

export default userRouter;