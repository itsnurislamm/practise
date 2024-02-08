const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/sendToTelegram', (req, res) => {
    const { message, chatId, botToken } = req.body;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        res.json({ success: data.ok });
    })
    .catch(error => {
        console.error('Ошибка при отправке сообщения в телеграм:', error);
        res.status(500).json({ success: false });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
