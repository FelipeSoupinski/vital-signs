require('dotenv').config()
import express from 'express'
import { Router, Request, Response } from 'express'
import { makeQuestionsSOWorker, Scheduler, WorkerQueueProcessor } from './stack-overflow'

const app = express()
const route = Router()
app.use(express.json())

route.get('/', async (req: Request, res: Response) => {
  try {
    const scheduler = new Scheduler()
    const workerQueueProcessor = new WorkerQueueProcessor()

    await scheduler.resolve()
    await workerQueueProcessor.resolve()
  }
  catch (error) {
    console.error(error)
  }

  res.json({
    message: 'OK'
  })
})

route.get('/questions', async (req: Request, res: Response) => {
  const tag = 'phantomjs'
  const QuestionSO = makeQuestionsSOWorker(tag)

  res.json({
    message: await QuestionSO.resolve().catch(console.error)
  })
})

app.use(route)

app.listen(3333, () => 'server running on port 3333')
