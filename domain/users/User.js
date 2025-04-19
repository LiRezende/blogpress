const Sequelize = require("sequelize");
const connection = require("../../database/database");

const User = connection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 25]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 16]
        }
    }
});

module.exports = User;