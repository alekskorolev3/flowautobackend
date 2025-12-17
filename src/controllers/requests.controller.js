import { connectDB } from '../config/mongo.js'

export async function getRequests(req, res) {
    const db = await connectDB()

    const items = await db
        .collection('requests')
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray()

    res.json(items)
}

export async function createRequest(req, res) {
    try {
        const { name, phone, email = '', message = '' } = req.body

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' })
        }

        const db = await connectDB()

        const newRequest = {
            name,
            phone,
            email,
            message,
            status: 'NEW',
            createdAt: new Date()
        }

        await db.collection('requests').insertOne(newRequest)

        await notifyAdmins(
            `📥 Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || '-'}\nСообщение: ${message || '-'}`
        )

        res.status(201).json({ success: true })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
