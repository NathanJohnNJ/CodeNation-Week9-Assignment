//Import any dependancies needed
const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

//Define a Data model
const Data = connection.define("Data", {
    username: {
        type:DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    supportingImages: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UserId: {
        type: DataTypes.INTEGER
    }
})

module.exports = Data;