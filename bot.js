

const token = process.env.BOT_TOKEN || '7841059570:AAFEPUTgf1MGoFZDOBKZNK5X8xvg7hTZJHA';
const bot = new TelegramBot(token);
bot.setWebHook(`https://app-2-lk2d.onrender.com/bot${token}`);

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bot ishlayapti ✅', {
    reply_markup: {
      keyboard: [
        [
          { text: 'WebApp ochish', web_app: { url: 'https://app-2-lk2d.onrender.com' } }
        ]
      ],
      resize_keyboard: true
    }
  });
});

app.listen(3000, () => console.log('Bot webhook rejimida ishlayapti'));
