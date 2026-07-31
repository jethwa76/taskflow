import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { authRouter } from './routes/auth.routes.js'
import { tasksRouter } from './routes/tasks.routes.js'
import { usersRouter } from './routes/users.routes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

export const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }))
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'taskflow-api' }))
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)
app.use(notFound)
app.use(errorHandler)
