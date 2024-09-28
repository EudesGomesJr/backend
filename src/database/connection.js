const { Sequelize } = require('sequelize');

const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: '3366',
    username: 'root',
    password: '12345678',
    database: 'blog'
  });

  module.exports = connection;
  
//   let resultado = connection.query('SHOW TABLES');
//   resultado.then(tabelas => console.log(tabelas));

// let query = connection.getQueryInterface();

// query.showAllTables().then(tables => console.log(tables));
// query.showAllSchemas().then(schemas => console.log(schemas));


