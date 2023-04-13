import { Worker, QueueEvents } from 'bullmq'
import { makeQuestionsSOWorker } from '../factory'

export class WorkerQueueProcessor {
  constructor() {}

  async resolve() {
    const worker = new Worker(
      'Projects',
      async (job) => {
        if (job.name === 'SO') {
          const questionSOWorker = makeQuestionsSOWorker(job.data.tag_so)
          const workerResponse = await questionSOWorker.resolve()
          if (!workerResponse) {
            throw new Error(
              'Error on get questions in SO worker for project ' +
                job.data.tag_so
            )
          }
        }
      },
      {
        connection: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT)
        },
        concurrency: parseInt(process.env.CONCURRENCY || '1')
      }
    )

    const queueEvents = new QueueEvents('Projects', {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    })

    queueEvents.on('completed', ({ jobId }) => {
      console.log('done')
    })

    queueEvents.on(
      'failed',
      ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        console.error('error', failedReason)
      }
    )
  }
}
