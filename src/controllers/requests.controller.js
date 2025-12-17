import { connectDB } from '../config/mongo.js'
import bot from '../bot/index.js'

export async function POST(req, res) {
    try {
        const body = await req.json()
        const { name, phone, email, message } = body

        if (!name || !phone) {
            return new Response(JSON.stringify({ error: 'Name and phone are required' }), { status: 400 })
        }

        const db = await connectDB()

        const newRequest = {
            name,
            phone,
            email: email || '',
            message: message || '',
            status: 'NEW',
            createdAt: new Date()
        }

        await db.collection('requests').insertOne(newRequest)

        // Отправляем уведомление боту
        const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || []
        for (const id of ADMIN_IDS) {
            await bot.telegram.sendMessage(
                id,
                `📥 Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || '-'}\nСообщение: ${message || '-'}`
            )
        }

        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 })
    }
}
