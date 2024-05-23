const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Match = sequelize.define("match", {
    championshipId: {
        type: DataTypes.INTEGER,
        references: {
            model: "championships",
            key: "id",
        },
    },
    roundNumber: {
        type: DataTypes.INTEGER,
        references: {
            model: "rounds",
            key: "id",
        },
    },
    governmentTeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: "teams",
            key: "id",
        },
    },
    oppositionTeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: "teams",
            key: "id",
        },
    },
});

module.exports = Match;