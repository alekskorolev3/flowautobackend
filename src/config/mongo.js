import { MongoClient } from 'mongodb'

let client
let db

export async function connectDB() {
    if (!db) {
        const uri = process.env.MONGO_URI

        if (!uri) {
            throw new Error('❌ MONGO_URI is not defined')
        }

        const client = new MongoClient(uri, {
            tls: true,
            tlsAllowInvalidCertificates: false, // true только для теста
        })
        await client.connect()

        db = client.db(process.env.DB_NAME)
        console.log('✅ MongoDB connected')
    }

    return db
}
