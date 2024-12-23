const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); // use é um midleware para manipular a requisição que transforma o body em json
app.use(cors());
app.use('/public', express.static('static')) // Este comando serve para informar que o diretório static, do servidor, 
                                             // pode ser visto por qualque pessoa, acessando a pasta /public
const fs = require("fs"); // fs = File System
const {
  ListUsers,
  UserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} = require("./controllers/UserController");

const { 
  CreatePost, 
  ListPosts,
  PostBySlug 
} = require("./controllers/PostsController");

const { 
  CreateTag, 
  ListTags,
  UpdateTag,
  DeleteTag
} = require("./controllers/TagsController");

app.get("/", (request, response) => {
  response.end("Api backend do blog"); // .end já identifica que se trata de um conteúdo HTML
});

app.get("/users", ListUsers);
app.get("/users/:id", UserById);
app.post("/users", CreateUser);
app.put("/users/:id", UpdateUser);
app.delete("/users/:id", DeleteUser);
app.get("/posts", ListPosts);

app.post("/posts", CreatePost);
app.get("/posts/:slug", PostBySlug)

app.post("/tags", CreateTag);
app.get("/tags", ListTags);
app.put("/tags/:id", UpdateTag);
app.delete("/tags/:id", DeleteTag);

// app.get('/post/:slug', (request,response) => {
//     //console.log(request.params.slug);
//     let slug = request.params.slug;
//     response.json({
//         title: slug
//     });
// })

// app.get('/contato',(request, response)=> {
//     let content = fs.readFileSync(__dirname + '/view/contato.html');
//     response.end(content); // .end já identifica que se trata de um conteúdo HTML
// })

app.listen(3000); // Número da porta = 3000
