import express, { Express, Request, Response } from 'express'

import cors from 'cors'
import userRouter from './src/routes/user.routers'
import messageRouter from './src/routes/message.routers'
import db from './src/services/db.services'

const app:Express = express()
const port = process.env.PORT || 8000

db.sync();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use("/api/users", userRouter)
app.use("/api/message", messageRouter)

app.get('/', (_req: Request, res: Response) => {
  res.json({ info: 'Hello World' })
})

app.listen(port, () => {
  console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})