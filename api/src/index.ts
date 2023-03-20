require('dotenv').config()
import express from 'express'
import { Router, Request, Response } from 'express'

import { QuestionTests, AnswerRateTest } from './stack-overflow/queries/posts-teste'

const app = express()
const route = Router()
app.use(express.json())

route.get('/', async (req: Request, res: Response) => {
  res.json({ message: await QuestionTests().catch(console.error) })
})

route.get('/answer-rate', async (req: Request, res: Response) => {
  res.json({ message: await AnswerRateTest().catch(console.error) })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
