import { Prisma, PrismaClient } from '@prisma/client'
import { Queue } from 'bullmq'

const prisma = new PrismaClient()

export class ProjectAdd {

  async add(data: Prisma.ProjectCreateInput): Promise<boolean> {
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
        const queue = new Queue('Projects', {
          connection: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
          }
        })

        await queue.add('SO', projectCreated, { priority: 1 })

        await queue.close()
      }

      return !!projectCreated

    } catch (error) {
      console.error(error)
      return false
    }
  }

}
