import express from 'express';
import { getPublicPosts, addNewPost, getMyPosts, editPost, deletePost } from '../controllers/postControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const postRouter = express.Router();

postRouter.get('/post/public', getPublicPosts);
postRouter.post('/post/new', checkAuth, addNewPost);
postRouter.get('/post/me/:userId', checkAuth, getMyPosts);
postRouter.put('/post/edit/:id', checkAuth, editPost);
postRouter.delete('/post/delete/:id', checkAuth, deletePost);

export default postRouter;