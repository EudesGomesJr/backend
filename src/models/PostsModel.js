const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const columns = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'users'
            },
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    content: DataTypes.TEXT,
    image: DataTypes.STRING(255)
};

const config = {tableName: 'posts'};

let PostsModel = connection.define("PostsModel", columns, config);

module.exports = PostsModel;
