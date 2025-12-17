import { ObjectId } from 'mongodb'
import {connectDB} from "../../config/mongo.js";
import {CLOSE_REQUEST_MESSAGE, requestMessage} from "../messages/const.js";

export const requestsHandler = (bot) => {
    bot.hears('📥 Заявки', async (ctx) => {
        const db = await connectDB()

        const items = await db
            .collection('requests')
            .find({ status: 'NEW' })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray()

        if (!items.length) {
            return ctx.reply('Заявок нет')
        }

        for (const r of items) {
            await ctx.reply(
                requestMessage(r),
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: CLOSE_REQUEST_MESSAGE,
                                    callback_data: `close:${r._id}`
                                }
                            ]
                        ]
                    }
                }
            )
        }
    })

    bot.action(/close:(.+)/, async (ctx) => {
        try {
            const id = ctx.match[1];

            const db = await connectDB()

            // Обновляем статус заявки
            await db.collection('requests').updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: 'CLOSED' } }
            );

            // Отправляем уведомление пользователю
            await ctx.answerCbQuery('Закрыто');

            // Удаляем сообщение, на которое нажали кнопку
            await ctx.deleteMessage();
        } catch (err) {
            console.error(err);
            await ctx.answerCbQuery('Ошибка при закрытии', { show_alert: true });
        }
    })
}
