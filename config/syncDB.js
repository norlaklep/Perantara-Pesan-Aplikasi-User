const sequelize = require('./database');
const User = require('../models/user');
const Application = require('../models/application');

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
