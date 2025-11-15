import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'likeme',
    allowExitOnIdle: true
})

export const addPosts = async (titulo, img, descripcion) => {
    const consulta = 'INSERT INTO posts values (DEFAULT,$1, $2, $3, 0)';
    const values = [titulo, img, descripcion];
    const result = await pool.query(consulta, values);
    console.log('Post agregado:', result);
}


export const getPosts = async () => {
    const { rows } = await pool.query ('SELECT * FROM posts');
    console.log(rows);
    return rows;
}

export const editPosts = async (id) => {
    const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(consulta, values);
    return result.rows[0];
}

export const deletePosts = async (id) => {
    const consulta = 'DELETE FROM posts WHERE id=$1';
    const values = [id];
    const result = await pool.query(consulta, values);
    return result.rowCount > 0;
}
