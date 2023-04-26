import { Prisma, PrismaClient } from '@prisma/client'
import { ProjectQueue } from '../stack-overflow/projects-queue'

const prisma = new PrismaClient()

export class ProjectModel {

  async getAll() {
    try {
      return await prisma.project.findMany()
    } catch (error) {
      console.error(error)
    }
  }

  async create(data: Prisma.ProjectCreateInput): Promise<boolean> {
    try {
      const projectAlreadyExists = !!await prisma.project.findFirst({
        where: {
          tag_so: data.tag_so
        }
      })

      if (projectAlreadyExists) {
        return true
      }

      const projectCreated = await prisma.project.create({ data })

      if (projectCreated) {
        const projectQueue = ProjectQueue.getInstance().queue
        projectQueue.add('SO', projectCreated, { priority: 1 })
        console.log('added', projectCreated)
      }

      return !!projectCreated

    } catch (error) {
      console.error(error)
      return false
    }
  }

}
