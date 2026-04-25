import query from "../db.js";

export async function registerUser(userData) {
    const { name, email, password } = userData;
    const { rows } = await query(`
        INSERT INTO users_test (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name, email, password]
    );

    return rows[0];
}

export async function getUser(userData) {
    const { email } = userData;
    const { rows } = await query(`
        SELECT id, name, email, password_hash
        FROM users_test
        WHERE email = $1`,
        [email]);

    return rows[0];
}

export async function editUser(userData) {
    const { id, name, email } = userData;
    const { rows } = await query(`
        UPDATE users_test
        SET name = $2, email = $3
        WHERE id = $1
        RETURNING id, name, email`,
        [id, name, email]);

    return rows[0];
}