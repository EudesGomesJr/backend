const UserModel = require('./models/UserModel');

// UserModel.create({
//     firstname: 'Eudes',
//     surname: 'Gomes',
//     username: 'eudes',
//     email: 'eudes@gmail.com',
//     password: '123456'
// }).then(resultado => {
//     console.log(resultado);
// });

UserModel.findAll().then(resultado => console.log(resultado));