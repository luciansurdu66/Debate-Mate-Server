const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Championship = sequelize.define("championship", {
    name: DataTypes.STRING,
    rounds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = Championship;