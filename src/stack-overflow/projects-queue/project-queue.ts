import { Queue } from 'bullmq'

export class ProjectQueue {
  private static instance: ProjectQueue
  public queue: Queue

  private constructor() {
    this.queue = new Queue('Projects', {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    })
  }

  public static getInstance(): ProjectQueue {
    if (!ProjectQueue.instance) {
      ProjectQueue.instance = new ProjectQueue()
    }

    return ProjectQueue.instance
  }
}

export default ProjectQueue.getInstance()
