const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // Nama file database
    logging: false, // Disable logging SQL queries to the console
});

module.exports = sequelize;
