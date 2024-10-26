const UserModel = require("../models/UserModel");

const CreateUser = async (request, response) => {
  try {
    await UserModel.create(request.body);
    response.status(201);
    response.json({ message: "Usuário criado com sucesso" }); // Como o padão de comunicação numa ApiRest é Json
  } catch (error) {
    console.log(error.message);
    response.status(400); // Erro dos dados informados pelo usuário
    response.json({ message: "Erro ao criar usuário" });
  }
};

const ListUsers = async (request, response) => {
  try {
    const users = await UserModel.findAll();
    response.status(200);
    response.json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500); // Erro interno, que não depende do usuário
    response.json({ message: "Erro de conexão com o banco" });
  }
};

const UserById = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id);
    if (user === null) {
      response.status(400);
      response.json({ message: "Usuário não encontrado" });
    } else {
      response.status(200);
      response.json(user);
    }
    response.status(200);
  } catch (error) {
    console.log(error.message);
    response.status(500);
    response.json({
      message: "Erro de conexão com o banco. Entre em contato com o suporte.",
    });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id);
    if (user === null) {
      response.status(400);
      response.json({ message: "Usuário não encontrado" });
    } else {
      user.set(request.body);
      await user.save();
      response.status(200);
      response.json({ message: "Usuário atualizado com sucesso" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    response.json({
      message: "Erro ao tentar atualizar dados do usuário",
    });
  }
};
const DeleteUser = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id);
    if (user === null) {
      response.status(400);
      response.json({ message: "Usuário não encontrado" });
    } else {
      await user.destroy();
      response.status(200);
      response.json({ message: "Usuário deletadp com sucesso" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    response.json({
      message: "Erro ao tentar deletar o usuário",
    });
  }
};

module.exports = {
  ListUsers,
  UserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
