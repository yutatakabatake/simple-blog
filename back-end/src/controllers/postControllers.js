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