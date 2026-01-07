import {connectDB} from "../../config/mongo.js";


export const adminMiddleware = async (ctx, next) => {
    if (!ctx.from) return

    const db = await connectDB()

    const admin = await db.collection('admin').findOne({
        telegramId: ctx.from.id
    })

    if (!admin) {
        await ctx.reply('⛔ Нет доступа')
        return
    }

    ctx.admin = admin
    return next()
}
