const { Op } = require('sequelize');
const UserModel = require('./models/UserModel');
const PostsModel = require('./models/PostsModel');

// UserModel.create({
//     firstname: 'Eudes',
//     surname: 'Gomes',
//     username: 'eudes',
//     email: 'eudes@gmail.com',
//     password: '123456'
// }).then(resultado => {
//     console.log(resultado);
// });

//UserModel.findAll().then(resultado => console.log(resultado));

PostsModel.belongsTo(UserModel, {foreignKey: 'user_id'});

async function execute() {
//     await PostsModel.create({
//         user_id: 1,
//         title: "Aprendendo CSS",
//         content: "Loren ipsum kdjf skjdl sljd testando algo mais ..."
//     });

let posts = await PostsModel.findOne({
    include: UserModel
});

console.log(posts.UserModel.email);

    /*
    // Inserindo informaçoes
    await UserModel.create({
        firstname: 'Eudes',
        surname: 'Gomes',
        username: 'eudes' + Math.random(),
        email: 'eudes@gmail.com' + Math.random(),
        password: '123456'
    });

    // Recuperar informações
    let users = await UserModel.findAll({
        where: {
            username: "eudes2"
        }}
    );
    console.log(users);

    // Deletando itens
    let result = await UserModel.destroy ({
        where: {
            id : {[Op.gte]: 10} 
        }
    });
    console.log(result);
    */
}

execute();