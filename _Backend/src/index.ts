import { Request, Response, NextFunction } from 'express'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { getRouter } from '@libs/the-router'

import './routes'

const port = process.env.PORT || 3000
const app = express()

// Middlewares
const allowedOrigins = ['http://localhost:3000']

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  console.log('Request:', request.path, ' Params:', request.params)
  next()
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)

app.use(requestLogger)
app.use(cookieParser())
app.use(express.json())

// Initialize and connect router
app.use(getRouter())

// Server run
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
