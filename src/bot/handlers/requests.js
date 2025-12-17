import { ObjectId } from 'mongodb'
import {CLOSE_REQUEST_MESSAGE, requestMessage} from "@/bot/messages/const";

export const requestsHandler = (bot) => {
    bot.hears('📥 Заявки', async (ctx) => {
        const client = await clientPromise
        const db = client.db("flowautodb")

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

    // bot.hears('🚗 Каталог', async (ctx) => {
    //     const client = await clientPromise
    //     const db = client.db("flowautodb")
    //
    //     const items = await db
    //         .collection('cars')
    //         .find()
    //         .toArray()
    //
    //     if (!items.length) {
    //         return ctx.reply('Заявок нет')
    //     }
    //
    //     for (const car of items) {
    //         await ctx.reply(
    //             `🆕 ${car.name}`,
    //             {
    //                 reply_markup: {
    //                     inline_keyboard: [
    //                         [
    //                             {
    //                                 text: 'Изменить',
    //                                 callback_data: `close:${car._id}`
    //                             }
    //                         ]
    //                     ]
    //                 }
    //             }
    //         )
    //     }
    // })

    bot.action(/close:(.+)/, async (ctx) => {
        try {
            const id = ctx.match[1];

            const client = await clientPromise;
            const db = client.db("flowautodb");

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
