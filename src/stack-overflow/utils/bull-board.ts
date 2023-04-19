import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ProjectQueue } from '../'

const projectQueue = ProjectQueue.getInstance().queue
const bullAdapter = new BullMQAdapter(projectQueue)
const bullMQServerAdapter = new ExpressAdapter()
bullMQServerAdapter.setBasePath('/admin/queues')

const bullBoard = createBullBoard({
  queues: [bullAdapter],
  serverAdapter: bullMQServerAdapter
})

export const bullServerAdapter = bullMQServerAdapter
