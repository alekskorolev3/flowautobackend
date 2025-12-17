import express from 'express'
import requestsRoutes from './routes/requests.routes.js'

const app = express()

app.use(express.json())

app.use('/api/requests', requestsRoutes)

app.get('/health', (_, res) => res.send('OK'))

export default app
