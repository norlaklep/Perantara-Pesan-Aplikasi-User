const sequelize = require('./database');
const User = require('../models/user');

sequelize.sync({ force: false }) // Set to 'true' if you want to drop tables and recreate them
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
