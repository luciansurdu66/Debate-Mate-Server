const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Debater = sequelize.define("debater", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    club: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Debater;
