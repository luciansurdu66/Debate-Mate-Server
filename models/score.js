const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Score = sequelize.define("score", {
    championshipId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "championships",
            key: "id",
        },
    },
    roundNumber: {
        type: DataTypes.INTEGER,
        
    },
    matchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "matches",
            key: "id",
        },
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "teams",
            key: "id",
        },
    },
    debaterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "debaters",
            key: "id",
        },
    },
    adjudicatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "adjudicators",
            key: "id",
        },
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Score;
