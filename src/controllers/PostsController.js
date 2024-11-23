const fs = require("fs");
const path = require("path");
const PostsModel = require("../models/PostsModel");
const {getImagePath, makeDirIfNotExists} = require('../utils/PathHandler');
const {saveByBase64} = require('../service/imageUpload')


const CreatePost = async (request, response) => {
  let { type, mime, content } = request.body.image;
  let { user_id, title } = request.body;

  let directory =getImagePath();
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
      let response = await fetch(content);
      let mimeType = response.headers.get("content-type");
      let extension = mimeTypeMap[mimeType];
      if (!extension) {
        throw new Error("Tipo de arquivo da url inválido");
      }

      let buffer = await response.arrayBuffer();
      buffer = Buffer.from(buffer, "binary");

      filename = `${filename}.${extension}`;
      fs.writeFileSync(`${directory}/${filename}`, buffer, {
        encoding: "binary",
      });
    } else {
      response.status(400); // Erro dos dados informados pelo usuário
      throw new Error("Tipo inválido");
    }

    //return response.json({ message: "Arquivo criado com sucesso" });

    let post = await PostsModel.create({
      user_id,
      title,
      image: filename,
    });
    
    return response.json(post); // Costuma-se devolver para o usuário o que foi gravado no BD 

  } catch (error) {
    if (fs.existsSync(`${directory}/${filename}`)) {
      fs.unlinkSync(`${directory}/${filename}`);
    }
    console.log(error.message); // Informações mais detalhadas apenas para os desenvolvedores
    response.status(400); // Erro dos dados informados pelo usuário
    return response.json({ message: "Erro ao criar post" }); // Msg padrão para o usuário
  }
};

module.exports = {
  CreatePost,
};
