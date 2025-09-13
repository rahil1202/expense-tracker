import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDb } from './config/db.js'

dotenv.config()

await initDb() 

const app = express()
 app.use(cors())
 app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello! from the backend!')
})

app.get('/api/v1/health', (_req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime()
  })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
