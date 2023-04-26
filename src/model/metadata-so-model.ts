import { MetadataSO, PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

export class MetadataSOModel {

  async getAll() {
    try {
      return await prisma.metadataSO.findMany()
    } catch (error) {
      console.error(error)
    }
  }

  async getByTag(tag: string): Promise<MetadataSO | null> {
    try {
      return await prisma.metadataSO.findFirst({
        where: {
          project_tag: tag,
          status: {
            not: Status.RUNNING
          },
          last_question_time: {
            not: null
          }
        },
        orderBy: {
          last_question_id: 'desc'
        }
      })

    } catch (error) {
      console.error(error)
      return null
    }
  }

}
