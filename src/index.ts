require('dotenv').config()
import cors from 'cors'
import express from 'express'
import route from './routes'
import { bullServerAdapter } from './stack-overflow/utils'
import { Scheduler, WorkerQueueProcessor } from './stack-overflow'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/admin/queues', bullServerAdapter.getRouter())

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
