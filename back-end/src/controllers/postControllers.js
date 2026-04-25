import userRouter from "../routes/userRoutes.js";
import * as postServices from "../services/postServices.js";

export async function getPublicPosts(req, res) {
    try {
        const publicPosts = await postServices.getPublicPosts();
        res.status(200).json(publicPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function addNewPost(req, res) {
    try {
        const { author_id, title, excerpt, content, published } = req.body;
        if (!author_id || !title || !excerpt || !content || !published) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const postData = { author_id, title, excerpt, content, published };

        if (published) {
            const newPost = await postServices.addNewPublicPost(postData);
            res.status(201).json(newPost);
        } else {
            const newPost = await postServices.addNewDraftPost(postData);
            res.status(201).json(newPost);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getMyPosts(req, res) {
    try {
        const author_id = req.params.userId;
        if (!author_id) {
            res.status(400).json({ error: 'Missing required fields' });
        }
        const userData = { author_id };

        const myPosts = await postServices.getMyPosts(userData);
        res.status(200).json(myPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function editPost(req, res) {
    try {
        const { id } = req.params;
        const { title, excerpt, content, published, author_id } = req.body;
        if (!title || !excerpt || !content) {
            res.status(400).json({ error: 'Missing required fields' });
        }

        const postData = { id, title, excerpt, content, published, author_id };

        const editedPost = await postServices.editPost(postData);
        res.status(200).json(editedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const { author_id } = req.body;

        const postData = { id, author_id };

        const deletedPost = await postServices.deletePost(postData);
        res.status(200).json(deletedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}