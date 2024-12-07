const { Op } = require('sequelize');
const UserModel = require('./models/UserModel');
const PostsModel = require('./models/PostsModel');

PostsModel.belongsTo(UserModel, {foreignKey: 'user_id'});  // Estabelece uma conexão entre tabelas pela chave estrangeiras

async function execute() {

let recentUser = await UserModel.create({
    firstname: 'Eudes',
    surname: 'Gomes',
    username: 'eudes' + Math.random(),
    email: 'eudes@gmail.com' + Math.random().toString(16).slice(2),
    password: '123456'
});

await PostsModel.create({
    user_id: recentUser.id,
    title: "Aprendendo Css",
    content: "Teste de Css"
})

let posts = await PostsModel.findOne({
    include: UserModel   // Inclui na chamada de post os dados do usuário, conforme conexão acima
});

console.log(posts.UserModel.email);

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
// console.log(posts.UserModel.email);

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