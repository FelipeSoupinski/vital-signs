import { PrismaClient } from '@prisma/client'
import { ProjectQueue } from './project-queue'

const prisma = new PrismaClient()

export class Scheduler {
  constructor() { }

  async run() {
    const projects = await prisma.project.findMany()
    const projectQueue = ProjectQueue.getInstance().queue

    for (const project of projects) {
      projectQueue.add('SO', project)
      console.log('added', project)
    }
  }
}
