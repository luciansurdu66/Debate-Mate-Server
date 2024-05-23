const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Team = sequelize.define("team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  debater1Id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'debaters', // name of your debater model
      key: 'id'
    }
  },
  debater2Id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'debaters', // name of your debater model
      key: 'id'
    }
  },
  debater3Id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'debaters', // name of your debater model
      key: 'id'
    }
  }
});

module.exports = Team;