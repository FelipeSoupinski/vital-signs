require('dotenv').config()
import express from 'express'
import { Router, Request, Response } from 'express'
import { ProjectAdd } from './stack-overflow/project/project-add'
import {
  makeQuestionsSOWorker,
  Scheduler,
  WorkerQueueProcessor
} from './stack-overflow'

const app = express()
const route = Router()
app.use(express.json())

route.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'OK' })
})

route.get('/schedule', async (req: Request, res: Response) => {
  await new Scheduler().run()
  res.json({ message: 'OK' })
})

route.get('/questions', async (req: Request, res: Response) => {
  const tag = 'phantomjs'
  const QuestionSO = makeQuestionsSOWorker(tag)

  res.json({
    message: await QuestionSO.resolve().catch(console.error)
  })
})

route.post('/project', async (req: Request, res: Response) => {
  const data = {
    name: req.body.name,
    tag_so: req.body.tag_so,
    link_gh: req.body.link_gh
  }

  res.json({
    message: await new ProjectAdd().add(data).catch(console.error)
  })
})

app.use(route)

app.listen(3333, async () => {
  console.log('server running on port 3333')

  try {
    await new Scheduler().run()
    await new WorkerQueueProcessor().resolve()
  } catch (error) {
    console.error(error)
  }
})
