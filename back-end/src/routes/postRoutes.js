import express from 'express';
import { getPublicPosts, addNewPost, getMyPosts } from '../controllers/postControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);
postRouter.post('/post/new', addNewPost);
postRouter.get('/post/me', checkAuth, getMyPosts);

export default postRouter;