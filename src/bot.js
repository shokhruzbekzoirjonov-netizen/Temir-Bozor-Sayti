const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8861957329:AAFA2ScEt4lXFzVmeWpTQbiDbDp6HTj8L_k';

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot muvaffaqiyatli ishga tushdi...");

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  bot.sendMessage(chatId, `Salom ${firstName}! Shokha_web botiga xush kelibsiz.`, {
    reply_markup: {
      keyboard: [
        [{ text: "Shokha_web haqida" }, { text: "Aloqa" }]
      ],
      resize_keyboard: true
    }
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/start')) return;

  if (text === "Shokha_web haqida") {
    bot.sendMessage(chatId, "Bu bot orqali manga sayt buyurtma berishingiz mumkin, man sizga sayt narxi va muddatini aytib beraman. Agar savolingiz bo'lsa, iltimos, so'rov yuboring, va man qilgan saytni birini ko'rishingiz mumkin https://shokhruzbekzoirjonov-netizen.github.io/Temir-Bozor-Sayti/");
  } else if (text === "Aloqa") {
    bot.sendMessage(chatId, "Telegram: +998915956291, +998916257757\n📍 Manzil: Jizzax maskova kalxoz");
  } else {
    bot.sendMessage(chatId, "Tushunmadim. Iltimos, pastdagi tugmalardan foydalaning.");
  }
});