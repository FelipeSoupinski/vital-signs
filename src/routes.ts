import { Router, Request, Response } from 'express'
import { ProjectModel } from './project/project-model'
import { makeQuestionsSOWorker, Scheduler } from './stack-overflow'

const route = Router()

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
    message: await new ProjectModel().create(data).catch(console.error)
  })
})

export default route
