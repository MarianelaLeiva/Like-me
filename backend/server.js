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
  const { titulo, url: img, descripcion } = req.body
  await addPosts(titulo, img, descripcion)
  res.send("Post agregado con éxito")
})

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;
  const updatePost = await editPosts(id);
  res.json(updatePost);
})

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await deletePosts(id);
  res.send('Post eliminado con éxito');
})

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));