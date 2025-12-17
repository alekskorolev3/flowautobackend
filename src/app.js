import express from 'express'
import cors from 'cors'
import requestsRoutes from './routes/requests.routes.js'

const app = express()

app.use(cors({
    origin: ['https://flowauto.ru'], // разрешенные домены
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // если нужны куки
}))

app.use(express.json())

app.use('/api/requests', requestsRoutes)

app.get('/health', (_, res) => res.send('OK'))

export default app
