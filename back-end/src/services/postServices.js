import query from "../db.js";

export async function getPublicPosts() {
    const { rows } = await query(`
        SELECT
            p.id,
            u.id AS author_id,
            u.name AS author_name,
            p.title,
            p.excerpt,
            p.content,
            p.views,
            p.published,
            p.published_at,
            p.updated_at
        FROM posts_test p
        JOIN users_test u ON p.author_id = u.id
        WHERE p.published
        ORDER BY p.published_at DESC`);

    return rows;
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

export async function getMyPosts(userData) {
    const { author_id } = userData;
    const { rows } = await query(`
        SELECT
            p.id,
            u.id AS author_id,
            u.name AS author_name,
            p.title,
            p.excerpt,
            p.content,
            p.views,
            p.published,
            p.published_at,
            p.updated_at
        FROM posts_test p
        JOIN users_test u ON p.author_id = u.id
        WHERE p.author_id = $1
        ORDER BY p.published_at DESC`,
        [author_id]);

    return rows;
}

export async function editPost(postData) {
    const { id, title, excerpt, content, published, author_id } = postData;
    const { rows } = await query(`
        UPDATE posts_test
        SET
            title = $2,
            excerpt = $3,
            content = $4,
            published = $5,
            published_at = CASE
                WHEN $5 = true THEN COALESCE(published_at, CURRENT_TIMESTAMP)
                ELSE published_at
            END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND author_id = $6
        RETURNING id, author_id, title, excerpt, content, published, published_at`,
        [id, title, excerpt, content, published, author_id]);

    return rows[0];
}

export async function deletePost(postData) {
    const { id, author_id } = postData;
    const { rows } = await query(`
        DELETE FROM posts_test
        WHERE id = $1 AND author_id = $2
        RETURNING id`,
        [id, author_id]);

    return rows[0];
}