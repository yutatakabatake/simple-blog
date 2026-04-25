import { validationResult } from "express-validator";
import * as userServices from "../services/userServices.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import 'dotenv/config';

const saltRounds = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function registerUser(req, res) {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: result.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        const { name, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const userData = { name: name, email: email, password: password_hash };

        const newUser = await userServices.registerUser(userData);

        const token = jwt.sign(
            { email }, ACCESS_TOKEN_SECRET, { expiresIn: '24h' }
        );

        res.cookie('jwt_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function login(req, res) {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: result.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }

        const { email, password } = req.body;
        const userData = { email: email };

        const user = await userServices.getUser(userData);
        if (!user) {
            return res.status(400).json([
                {
                    message: "This user does not exist"
                }
            ]);
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json([
                {
                    message: "Password is incorrect"
                }
            ]);
        }

        const token = jwt.sign(
            { email }, ACCESS_TOKEN_SECRET, { expiresIn: '24h' }
        );

        res.cookie('jwt_token', token, {
            httpOnly: true,     // JavaScriptからアクセス不可
            secure: true,       // HTTPS通信でのみ送信
            sameSite: 'strict', // CSRF攻撃対策
            maxAge: 3600000     // 1時間（ミリ秒）
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function editUser(req, res) {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: result.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }

        const { id } = req.params;
        const { name, email } = req.body;

        const newUserData = { id: id, name: name, email: email };

        const editedUser = await userServices.editUser(newUserData);
        res.status(201).json(newUserData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}