import query from "../db.js";

export async function getPublicPosts() {
    const { rows } = await query(`
        SELECT
            p.id,
            p.title,
            p.excerpt,
            p.content,
            p.updated_at,
            p.published_at,
            u.name AS author_name
        FROM posts_test p
        JOIN users_test u ON p.author_id = u.id
        WHERE p.published
        ORDER BY p.published_at DESC`);

    return rows[0];
}