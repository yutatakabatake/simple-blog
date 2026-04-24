import express from 'express';
import { getPublicPosts, addNewPost, getMyPosts } from '../controllers/postControllers.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);
postRouter.post('/post/new', addNewPost);
postRouter.get('/post/me', getMyPosts);

export default postRouter;