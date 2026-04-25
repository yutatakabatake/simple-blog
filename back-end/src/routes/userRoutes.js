import express from 'express';
import { body } from "express-validator";
import { registerUser, login, editUser } from '../controllers/userControllers.js';
import checkAuth from '../middleware/checkAuth.js';

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
userRouter.put('/user/edit/:id',
    checkAuth,
    body('name').isString().notEmpty().escape(),
    body('email').isEmail().notEmpty().escape(),
    editUser);

export default userRouter;