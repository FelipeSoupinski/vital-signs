require('dotenv').config()
import express from 'express'
import { Router, Request, Response } from 'express'

import { GetQuestionsSO } from './stack-overflow/queries/questions'

const app = express()
const route = Router()
app.use(express.json())

route.get('/', async (req: Request, res: Response) => {
  const tag = 'fabric'

  res.json({ 
    message: await GetQuestionsSO(tag)
      .catch(console.error) 
  })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
