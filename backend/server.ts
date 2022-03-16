import express, { Express, Request } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './config/db'
import routes from './routes'
import { errorHandler, setUpLogger } from './helpers'

declare global {
  namespace Express {
    interface Request {
      user?: {
        fullName: string,
        email: string
      }
    }
  }
}

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}

// configure enviorement variables
dotenv.config()

async function main(): Promise<void> {

  // connect to mongoDB
  await connectToDB()

  const app = express()
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(setUpLogger())
  app.use('/', routes.defaultRoute)
  app.use('/users', routes.userRoute)
  app.use(errorHandler)

  const PORT = process.env.NODE_PORT || 8000
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

main()
