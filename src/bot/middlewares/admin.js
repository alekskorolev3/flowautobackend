import clientPromise from '@/lib/mongo'

export const adminMiddleware = async (ctx, next) => {
    if (!ctx.from) return

    const client = await clientPromise
    const db = client.db("flowautodb")

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
