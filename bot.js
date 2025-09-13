
// 1. Kutubxonalarni import qilish
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// 2. Express app yaratamiz
const app = express();
app.use(express.json());

// 3. Token
const token = process.env.BOT_TOKEN || '7841059570:AAFEPUTgf1MGoFZDOBKZNK5X8xvg7hTZJHA';

// 4. Botni yaratamiz (webhook uchun polling bermaymiz)
const bot = new TelegramBot(token);

// 5. Webhook URL (Render’dagi URL’ni shu yerga qo‘ying)
const webhookUrl = `https://app-2-lk2d.onrender.com/bot${token}`;
bot.setWebHook(webhookUrl);

// 6. Telegram POST yuboradigan endpoint
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 7. /start komandasi tugma bilan
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Salom! WebAppni ochish uchun tugmani bosing:', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'WebApp ochish',
            web_app: { url: 'https://app-2-lk2d.onrender.com' }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

// 8. Serverni ishga tushiramiz
const PORT = process.env.PORT || 10000; // Render o'zi beradi
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));

