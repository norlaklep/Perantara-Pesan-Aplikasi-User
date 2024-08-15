const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { sendTelegramMessage, registerApplication, getApplicationName } = require('../controllers/telegramController');

// Endpoint to register an application
router.post('/register', (req, res) => {
    const { app_id, app_name } = req.body;

    if (!app_id || !app_name) {
        return res.status(400).json({ error: 'app_id and app_name are required fields' });
    }

    registerApplication(app_id, app_name);
    res.status(200).json({ success: true, message: `Application ${app_name} registered successfully` });
});

// Endpoint to receive a message and forward it to the specified user
router.post('/send', async (req, res) => {
    const { app_id, username, title, message } = req.body;

    if (!username || !title || !message || !app_id) {
        return res.status(400).json({ error: 'app_id, username, title, and message are required fields' });
    }

    const appName = getApplicationName(app_id);
    if (!appName) {
        return res.status(404).json({ error: 'Application not found' });
    }

    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await sendTelegramMessage(user.chat_id, appName, message);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
});

module.exports = router;
