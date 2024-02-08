from flask import Flask, request
from telegram import Bot, Update
from telegram.ext import CommandHandler, MessageHandler, filters, CallbackContext, Updater
import os

app = Flask(__name__)

# Замени 'YOUR_BOT_TOKEN' на токен своего бота
bot = Bot(token='6923784441:AAFQM67Me3FCr7KHlJ91_6NSxzqKIYank7Q')

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Привет! Я бот для уведомлений.')

def send_notification(update: Update, context: CallbackContext) -> None:
    # Получаем текст сообщения из формы
    message_text = update.message.text

    # Замени 'YOUR_CHAT_ID' на chat_id своего чата в телеграм
    chat_id = '-1002106150989'

    # Отправляем уведомление в телеграм
    bot.send_message(chat_id=chat_id, text=message_text)

    update.message.reply_text('Уведомление успешно отправлено!')

@app.route('/webhook', methods=['POST'])
def webhook():
    json_str = request.get_data().decode("UTF-8")
    update = Update.de_json(json_str, bot)
    context = CallbackContext(bot)
    send_notification(update, context)
    return ''

if __name__ == '__main__':
    updater = Updater(token='6923784441:AAFQM67Me3FCr7KHlJ91_6NSxzqKIYank7Q', use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, send_notification))

    # Запускаем вебхук для принятия данных от сайта
    app.run(port=int(os.environ.get('PORT', 5000)), debug=True)
