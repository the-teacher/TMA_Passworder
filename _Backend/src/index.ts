import express from 'express'
import './routes/index'
import { getRouter } from '@the-teacher/the-router'

const app = express()
const PORT = process.env.PORT || 3000

app.use(getRouter())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
