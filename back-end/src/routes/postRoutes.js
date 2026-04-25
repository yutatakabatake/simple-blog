import express from 'express';
import { getPublicPosts, addNewPost, getMyPosts, editPost } from '../controllers/postControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);
postRouter.post('/post/new', addNewPost);
postRouter.get('/post/me', checkAuth, getMyPosts);
postRouter.put('/post/edit/:id', checkAuth, editPost);

export default postRouter;