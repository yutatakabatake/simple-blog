import express from 'express';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRouter);

app.listen(port, () => {
    console.log("listening on port 3000")
});