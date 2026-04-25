import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    // フロントエンドのURLはオリジン（スキーム＋ホスト＋ポート）だけを指定します
    origin: ['http://localhost:5173'],
    // Cookieのやり取りを許可する
    credentials: true,
    // 許可するメソッド
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // 許可するヘッダー
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(port, () => {
    console.log("listening on port 3000")
});