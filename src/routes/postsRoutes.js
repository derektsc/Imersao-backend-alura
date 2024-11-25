import express from "express";
import multer from "multer";
import { listarPosts, sendPost, uploadImagem, updateNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb (null, file.originalname);
  }
})

// caso esteja no linux basta a linha abaixo nao precisa do const storage
const upload = multer({ dest: "./uploads", storage})

const routes = (app) => {
  // Permite que o servidor interprete requisições com o corpo
  app.use(express.json());
  
  app.use(cors(corsOptions))

  // Rota para buscar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um post
  app.post("/posts", sendPost);

  app.post("/upload", upload.single("imagem"), uploadImagem )

  app.put("/upload/:id", updateNovoPost)
}


export default routes;