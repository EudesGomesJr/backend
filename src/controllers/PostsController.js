const fs = require("fs");
const path = require("path");
const PostsModel = require("../models/PostsModel");
const {
  getImagePath,
  makeDirIfNotExists,
  rmImageIfExists,
} = require("../utils/PathHandler");
const { saveByBase64, saveByUrl } = require("../service/imageUpload");

const CreatePost = async (request, response) => {
  let { type, mime, content } = request.body.image;
  let { user_id, title } = request.body;

  let directory = getImagePath();
  let filename = Math.random().toString(16).slice(2); //Gera números aleatórios usando hexadecimais

  try {
    makeDirIfNotExists(directory);

    if (!content || !type) {
      throw new Error("Body inválido");
    }

    if (type === "base64") {
      if (!mime) {
        throw new Error("Mime é obrigatório para o type base64");
      }

      filename = saveByBase64(filename, content, mime);
    } else if (type === "url") {
      filename = await saveByUrl(filename, content);
    } else {
      response.status(400); // Erro dos dados informados pelo usuário
      throw new Error("Tipo inválido");
    }

    let post = await PostsModel.create({
      user_id,
      title,
      image: filename,
    });

    return response.json(post); // Costuma-se devolver para o usuário o que foi gravado no BD
  } catch (error) {
    rmImageIfExists(filename);

    console.log(error.message); // Informações mais detalhadas apenas para os desenvolvedores
    response.status(400); // Erro dos dados informados pelo usuário
    return response.json({ message: "Erro ao criar post" }); // Msg padrão para o usuário
  }
};

module.exports = {
  CreatePost,
};
