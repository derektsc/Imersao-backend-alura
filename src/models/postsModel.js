import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//função assincrona para buscar todos os posts do banco de dados
export async function getAllPosts() {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
};

export async function createPost(newPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  return colecao.insertOne(newPost);
};

export async function updatePost(id, newPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: newPost});
};