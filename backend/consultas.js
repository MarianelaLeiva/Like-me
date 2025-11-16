import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'likeme',
    allowExitOnIdle: true
})

export const addPosts = async (titulo, img, descripcion) => {
    try {
        const consulta = 'INSERT INTO posts values (DEFAULT,$1, $2, $3, 0)';
        const values = [titulo, img, descripcion];
        const result = await pool.query(consulta, values);
        console.log('Post agregado:', result);
    } catch (error) {
        console.error('Error al agregar el post:', error);
    }
}

export const getPosts = async () => {
    try {
        const { rows } = await pool.query ('SELECT * FROM posts');
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        return [];
    }
}

export const editPosts = async (id, likes) => {
    try {
        const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *';
        const values = [likes, id];
        const result = await pool.query(consulta, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar el post:', error);
    }
}

export const deletePosts = async (id) => {
    try {
        const consulta = 'DELETE FROM posts WHERE id=$1';
        const values = [id];
        const result = await pool.query(consulta, values);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error al eliminar el post:', error);
    }
}
