import express from 'express'
import history from 'connect-history-api-fallback'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectMongo } from './services/mongo'
import usersRouter from './controllers/users.router'
import peopleRouter from './services/peopleGenerator'

// import routes from '@routes/index'
const allowedOrigins = [
  'http://localhost:8080',
  'https://api.namefake.com'
]

async function main (): Promise<void> {
  const app: express.Application = express()
  dotenv.config({ path: path.join(__dirname, '.env') })

  await connectMongo();

  const publicPath = path.resolve('../my-app-ui/dist')

  app.use(express.json())
  app.use(express.static(publicPath))
  app.use(history({
    index: 'index.html'
  }))
  app.use(express.static(publicPath))

  app.get('/')
  app.use(cors({
    origin: allowedOrigins,
    credentials: false
  }))

  // app.use(routes)
  app.use('/api/users', usersRouter);
  app.use('/api', peopleRouter)

  const PORT: number = parseInt(process.argv[2]) || 5000
  app.listen(PORT, () => {
    console.log(`My APP listening on port ${PORT}`)
  })
}

main()
