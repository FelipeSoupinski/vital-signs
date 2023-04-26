import { Router, Request, Response } from 'express'
import { ProjectModel } from './project/project-model'
import { Scheduler } from './stack-overflow'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
  res.json({ success: true })
})

route.get('/schedule', async (req: Request, res: Response) => {
  await new Scheduler().run()
  res.json({ success: true })
})

route.post('/project', async (req: Request, res: Response) => {
  const data = {
    name: req.body.name,
    tag_so: req.body.tag_so,
    link_gh: req.body.link_gh
  }

  res.json({
    success: await new ProjectModel().create(data)
  })
})

route.get('/projects', async (req: Request, res: Response) => {
  res.json({
    success: await new ProjectModel().getAll()
  })
})

export default route
