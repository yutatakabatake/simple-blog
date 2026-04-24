import express from 'express';
import { getPublicPosts } from '../controllers/postControllers.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);

export default postRouter;