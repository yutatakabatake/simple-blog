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