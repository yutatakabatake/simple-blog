import express from 'express';
import { getPublicPosts, addNewPost } from '../controllers/postControllers.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);
postRouter.post('/post/new', addNewPost);

export default postRouter;