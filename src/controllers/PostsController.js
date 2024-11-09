const { resolveObjectURL } = require("buffer");
const PostsModel = require("../models/PostsModel");
const fs = require('fs');
const path = require('path');

const mimeTypeMap = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/webp": "webp",
    "image/jfif": "jfif"
}
const CreatePost = async (request, response) => {
  let {type, mime, content} = request.body.image;
  let {user_id, title} = request.body;

  try {
    let directory = path.resolve('static/images'); // path.resolve é uma forma do node passar o caminho do projeto
    let filename = Math.random().toString(16).slice(2); //Gera números aleatórios usando hexadecimais 

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true});
    }

    if(!content || !type) {
        throw new Error("Body inválido");
    }
    if(type === 'base64') {
        if (!mime) {
            throw new Error("Mime é obrigatório para o type base64")
        }

        let extension = mimeTypeMap[mime];
        if(!extension) {
            throw new Error("Mime inválido")
        }

        filename = `${filename}.${extension}`;
        fs.writeFileSync(`${directory}/${filename}`, atob(content), {
            encoding: 'binary',
        });
    }

    //return response.json({ message: "Arquivo criado com sucesso" }); 

    await PostsModel.create({
      user_id,
      title,
      image: filename
    });

    response.status(201);
    return response.json({ message: "Post criado com sucesso" }); // Como o padão de comunicação numa ApiRest é Json
  } catch (error) {
    console.log(error.message); // Informações mais detalhadas apenas para os desenvolvedores
    response.status(400); // Erro dos dados informados pelo usuário
    return response.json({ message: "Erro ao criar post" }); // Msg padrão para o usuário
  }
};

module.exports = {
    CreatePost
  };