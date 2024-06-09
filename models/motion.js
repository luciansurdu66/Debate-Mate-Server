const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Motion = sequelize.define("motion", {
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Motion;