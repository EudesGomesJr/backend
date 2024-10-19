const UserModel = require('../models/UserModel');

const CreateUser = async (request, response) => {
    try {
        await UserModel.create(request.body);
        response.status(201);
        response.json({message: "Usuário criado com sucesso"}); // Como o padão de comunicação numa ApiRest é Json
    } catch (error) {
        console.log(error.message);
        response.status(400);  // Erro dos dados informados pelo usuário
        response.json({message:"Erro ao criar usuário "});
    }
}

const ListUsers = async (request, response) => {
    try {
        const users = await UserModel.findAll();
        response.status(200);
        response.json(users); 
    } catch (error) {
        console.log(error.message);
        response.status(500); // Erro interno, que não depende do usuário
        response.json({message:"Erro de conexão com o banco"});
    }
}

const UserById = async (request, response) => {
    // try {
    //     const users = await UserModel.findByPk();
    //     response.status(200);
    //     response.json(users); 
    // } catch (error) {
    //     console.log(error.message);
    //     response.status(500);
    //     response.json({message:"Erro de conexão com o banco. Entre em contato com o suporte."});
    // }
    response.end("GET /users")
}

const UpdateUser = (request, response) => {
    response.end("PUT /users/:id")
}
const DeleteUser = (request, response) => {
    response.end("DELETE /users/:id")
}

module.exports = {
    ListUsers, UserById, CreateUser, UpdateUser, DeleteUser
}
