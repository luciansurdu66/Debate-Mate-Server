const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Adjudicator = sequelize.define("adjudicator", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    club: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Adjudicator;
