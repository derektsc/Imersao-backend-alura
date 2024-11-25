import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts (req, res) {
  // Chama a função para buscar os posts
  const posts = await getAllPosts();
  // Envia uma resposta HTTP com status 200
  res.status(200).json(posts);
}

export async function sendPost(req, res) {
  const newPost = req.body;
  try {
    const postCriado = await createPost(newPost);
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function uploadImagem(req, res) {
  const newPost = req.body;
  try {
    const postCriado = await createPost(newPost);
    const imageUpdate = `uploads/${postCriado.insertedId}.png`
    fs.renameSync(req.file.path, imageUpdate)
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function updateNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    const postCriado = await updatePost(id, post);
    res.status(200).json(postCriado);
  } catch(erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}