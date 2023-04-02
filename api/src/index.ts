require('dotenv').config()
import express from 'express'
import { Router, Request, Response } from 'express'

import { GetQuestionsSO } from './stack-overflow/queries/questions'

const app = express()
const route = Router()
app.use(express.json())

route.get('/', async (req: Request, res: Response) => {
  const tag = 'phantomjs'
  const startDate = new Date('2010-02-01 00:00').getTime() / 1000
  const endDate = new Date('2023-02-28 23:59').getTime() / 1000

  res.json({ 
    message: await GetQuestionsSO(tag, startDate, endDate)
      .catch(console.error) 
  })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
