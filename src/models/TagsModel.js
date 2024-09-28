const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const columns = {name: DataTypes.STRING(50)};

const config = {
    tableName: 'tags', 
    timestamps: false
};

let TagsModel = connection.define("TagsModel", columns, config);

module.exports = TagsModel;