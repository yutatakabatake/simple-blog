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

        res.status(201).json({
            token: token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
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

        res.status(201).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}