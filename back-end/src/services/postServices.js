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

export async function addNewPublicPost(postData) {
    const { author_id, title, excerpt, content, published } = postData;
    const { rows } = await query(`
        INSERT INTO posts_test (author_id, title, excerpt, content, published, published_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING id, title, excerpt, content, updated_at, published_at`,
        [author_id, title, excerpt, content, published]
    );

    return rows[0];
}

export async function addNewDraftPost(postData) {
    const { author_id, title, excerpt, content, published } = postData;
    const { rows } = await query(`
        INSERT INTO posts_test (author_id, title, excerpt, content, published)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, title, excerpt, content, updated_at, published_at`,
        [author_id, title, excerpt, content, published]
    );

    return rows[0];
}