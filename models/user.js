const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
});

module.exports = User;