import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import { Telegraf } from 'telegraf'
import { adminMiddleware } from './middlewares/admin.js'
import { mainKeyboard } from './keyboards/main.js'
import { requestsHandler } from './handlers/requests.js'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(adminMiddleware)

bot.start((ctx) => {
    ctx.reply('Админка', mainKeyboard)
})

requestsHandler(bot)

export default bot
