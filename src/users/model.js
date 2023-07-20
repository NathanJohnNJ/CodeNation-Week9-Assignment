//Import any dependancies needed
const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

//Define a User model
const User = connection.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {indexes: [{unique: true, fields:["username", "email"]}]}
)

module.exports = User;