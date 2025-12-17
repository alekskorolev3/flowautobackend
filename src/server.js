import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import bot from "./bot/bot.js";

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})

bot.launch().then(() => console.log('🤖 Telegram bot started'))
