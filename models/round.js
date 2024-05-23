const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Round = sequelize.define('round', {
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    championshipId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'championships',
            key: 'id'
        }
    }
});

module.exports = Round;