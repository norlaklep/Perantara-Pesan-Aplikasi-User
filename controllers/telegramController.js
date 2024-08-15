const { bot } = require('../config/config');
const User = require('../models/user');
const Application = require('../models/application');

// Function to send a message via Telegram
function sendTelegramMessage(chatId, title, message) {
    const fullMessage = `From ${title}:\n\n${message}`;
    return bot.sendMessage(chatId, fullMessage); // Ensure this returns a promise
}

// Handle /start command to get user's chat ID
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username || 'Anonymous';

    try {
        const [user, created] = await User.findOrCreate({
            where: { chat_id: chatId },
            defaults: { username: username }
        });

        if (created) {
            bot.sendMessage(chatId, `Welcome, ${username}! Your chat ID is saved.`);
        } else {
            bot.sendMessage(chatId, `Welcome back, ${username}!`);
        }
    } catch (error) {
        bot.sendMessage(chatId, 'Error saving your chat ID.');
        console.error('Database error:', error);
    }
});

// Register a new application in the database
async function registerApplication(app_id, app_name) {
    try {
        const [application, created] = await Application.findOrCreate({
            where: { app_id: app_id },
            defaults: { app_name: app_name }
        });

        if (created) {
            console.log(`Application ${app_name} registered successfully.`);
        } else {
            console.log(`Application ${app_name} already registered.`);
        }
    } catch (error) {
        console.error('Error registering application:', error);
    }
}

// Get application name by ID from the database
async function getApplicationName(app_id) {
    try {
        const application = await Application.findOne({ where: { app_id: app_id } });
        return application ? application.app_name : null;
    } catch (error) {
        console.error('Error retrieving application:', error);
        return null;
    }
}

module.exports = {
    sendTelegramMessage,
    registerApplication,
    getApplicationName
};
