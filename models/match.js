const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Match = sequelize.define("match", {
    championshipId: {
        type: DataTypes.INTEGER,
        references: {
            model: "championships",
            key: "id",
        },
        allowNull: false,
    },
    roundNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    governmentTeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: "teams",
            key: "id",
        },
        allowNull: false,
    },
    oppositionTeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: "teams",
            key: "id",
        },
        allowNull: false,
    },
    adjudicatorId: {
        type: DataTypes.INTEGER,
        references: {
            model: "adjudicators",
            key: "id",
        },
        allowNull: false,
    }
});

module.exports = Match;