const UserModel = require("../models/UserModel");

const CreateUser = async (request, response) => {
  try {
    let user = await UserModel.create(request.body);
    user.setDataValue('password',undefined); // Retira a senha para não mostrá-la
    response.status(201);
    return response.json(user); // Substituiu a linha abaixo para padronizar o retorno do que foi gravado no banco
    // return response.json({ message: "Usuário criado com sucesso" }); // Como o padão de comunicação numa ApiRest é Json
  } catch (error) {
    response.status(400); // Erro dos dados informados pelo usuário
    if(Array.isArray(error.errors) && error.errors.length > 0) {
      return response.json({message: error.errors[0].message}) //Serve especificamente para o Sequelize
    }
    return response.json({ message: "Erro ao criar usuário" });
  }
};

const ListUsers = async (request, response) => {
  try {
    const users = await UserModel.findAll({
        attributes: {
            exclude:["password"]
        }}
    );
    response.status(200);
    return response.json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500); // Erro interno, que não depende do usuário
    return response.json({
        message: "Ocorreu um erro no servidor. Entre em contato com o suporte.",
      });
  }
};

const UserById = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id,{
        attributes: {
            exclude:["password"]
        }}
    );
    if (user === null) {
      response.status(404);
      return response.json({ message: "Usuário não encontrado" });
    } else {
      // Não colocando response.status ele retorna, por padrão, 200
      // response.status(200);
      return response.json(user);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    return response.json({
      message: "Ocorreu um erro no servidor. Entre em contato com o suporte.",
    });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id);
    if (user === null) {
      response.status(404);
      return response.json({ message: "Usuário não encontrado" });
    } else {
      user.set(request.body);
      await user.save();
      // Não colocando response.status ele retorna, por padrão, 200
      // response.status(200);
      return response.json({ message: "Usuário atualizado com sucesso" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    return response.json({
      message: "Erro ao tentar atualizar dados do usuário",
    });
  }
};

const UpdateUserKelvys = async (request, response) => {
    try {
        let {id} = request.params; // Desestruturação do objeto
        let {body} = request;
        let {total} = await UserModel.update(body, {
            where: {id}
        });
        if (total <= 0) {
            response.status(204);
            return response.json(
                { message: "Usuário atualizado com sucesso" }
            )
        };
    } catch (error) {
        response.status(500);
        return response.json({
          message: "Erro ao tentar atualizar dados do usuário",
        });
    }
  };

const DeleteUser = async (request, response) => {
  try {
    const user = await UserModel.findByPk(request.params.id);
    if (user === null) {
      response.status(400);
      return response.json({ message: "Usuário não encontrado" });
    } else {
      await user.destroy();
      // Não colocando response.status ele retorna, por padrão, 200
      // response.status(200);
      return response.json({ message: "Usuário deletadp com sucesso" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    return response.json({
      message: "Erro ao tentar deletar o usuário",
    });
  }
};

const DeleteUserKelvys = async (request, response) => {
    try {
        let {id} = request.params; // Desestruturação do objeto
        // No await UserModel.destroy abaixo, o retorno é um número, 
        // e não um array, como ocorre no update
        let total = await UserModel.destroy({
            where: {id}
        })
        if (total <= 0) {
            // Não colocando response.status ele retorna, por padrão, 200
            // response.status(200);
            return response.json(
                { message: "Usuário deletado com sucesso" }
            )
        };

    } catch (error) {
      console.log(error.message);
      response.status(500);
      return response.json({
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
