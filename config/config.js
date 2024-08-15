require('dotenv').config({ path: '.env.me' });

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

module.exports = {
    bot,
    PORT: process.env.PORT || 8000
};
