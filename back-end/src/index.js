import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(port, () => {
    console.log("listening on port 3000")
});