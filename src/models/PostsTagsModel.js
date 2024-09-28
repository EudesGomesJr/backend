const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const columns = {
    post_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'posts'
            },
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    tag_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'tags'
            },
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
};

const config = {
    tableName: 'posts_tags', 
    timestamps: false, 
    primaryKey: false
};

let PostsTagsModel = connection.define("PostsTagsModel", columns, config);

module.exports = PostsTagsModel;
