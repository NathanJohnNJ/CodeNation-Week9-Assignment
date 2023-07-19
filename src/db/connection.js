const { Sequelize } = require ("sequelize");
//Create connection using URI fom .env
const connection = new Sequelize (process.env.MYSQL_ADDON_URI);
//Authenticate connection and output message to console.
connection.authenticate();
console.log("DB connection is working.");
//Export connection
module.exports = connection;