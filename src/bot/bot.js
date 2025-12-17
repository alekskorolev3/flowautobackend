import { Telegraf } from 'telegraf'
import { adminMiddleware } from './middlewares/admin.js'
import { mainKeyboard } from './keyboards/main.js'
import { requestsHandler } from './handlers/requests.js'
import 'dotenv'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(adminMiddleware)

bot.start((ctx) => {
    ctx.reply('Админка', mainKeyboard)
})

requestsHandler(bot)

export default bot
