import { PrismaClient } from '@prisma/client'
import { Queue } from 'bullmq'

const prisma = new PrismaClient()

export class Scheduler {
  constructor() { }

  async resolve() {
    const projects = await prisma.project.findMany()
    const queue = new Queue('Projects', {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    })

    for (const project of projects) {
      queue.add('SO', project)
      console.log('added', project)
    }
  }
}
