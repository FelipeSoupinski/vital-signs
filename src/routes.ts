import { Router, Request, Response } from 'express'
import { ProjectModel, MetadataSOModel } from './model'
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
    link_gh: req.body.link_gh,
    is_dead: req.body.is_dead,
    death_date: req.body.death_date
  }

  res.json({
    success: await new ProjectModel().create(data)
  })
})

route.get('/projects', async (req: Request, res: Response) => {
  res.json({
    success: true,
    projects: await new ProjectModel().getAll()
  })
})

route.get('/metadata', async (req: Request, res: Response) => {
  res.json({
    success: true,
    metadata: await new MetadataSOModel().getAll()
  })
})

route.get('/metadata:tag', async (req: Request, res: Response) => {
  const tag = req.params.tag

  res.json({
    success: true,
    metadata: await new MetadataSOModel().getLastUpdatedMetadataByTag(tag)
  })
})

export default route
