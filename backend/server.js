import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { addPosts, getPosts, editPosts, deletePosts } from './consultas.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/posts',async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url: img, descripcion } = req.body
    await addPosts(titulo, img, descripcion);
    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send('Error al agregar el post');
  }
})

app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    const updatePost = await editPosts(id, likes);
    res.json(updatePost);

  } catch (error) {
    res.status(500).send('Error al actualizar el post');
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deletePosts(id);
    res.send('Post eliminado con éxito');
  } catch (error) {
    res.status(500).send('Error al eliminar el post');
  };
})

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));