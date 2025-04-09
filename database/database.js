const Sequelize = require("sequelize");
const connection = new Sequelize("db_blogpress", "root", "0123456", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;