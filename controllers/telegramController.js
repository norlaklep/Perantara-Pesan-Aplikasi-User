const { bot } = require('../config/config');
const User = require('../models/user');

// In-memory storage for applications
const applications = {};

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

// Register a new application
function registerApplication(app_id, app_name) {
    applications[app_id] = app_name;
}

// Get application name by ID
function getApplicationName(app_id) {
    return applications[app_id];
}

module.exports = {
    sendTelegramMessage,
    registerApplication,
    getApplicationName
};
