const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
    app_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    app_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Application;
